import { Injectable, Logger } from "@nestjs/common";

// TypeORM
import { DataSource, In, Repository } from "typeorm";

// Types
import { UserType } from "src/all-types";

// Custom Exception
import { CreatedException } from "src/exception-filters/created.exception";
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Utils
import { calculateTaxForItem } from "src/utils/calculate-tax-for-item";
import { calculateGST, calculatePaymentGatewayFee, totalPriceWithGST, totalPriceWithoutGST } from "src/utils/calculate-order-amounts";

// Models
import { OrderDetailsModel } from "src/admin/orders/entities/order.entity";
import { OrderItemsModel } from "src/admin/orders/entities/order-items.entity";
import { CartsModel } from "../cart/entities/cart.entity";
import { CustomerAddressModel } from "../address/entities/address.entity";

// CONSTANTS
import { CartStatus } from "../cart/constants";

// DTO
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  private readonly logger = new Logger(`Customer${OrderService.name}`);

  private readonly cartsTableRepository: Repository<CartsModel>;
  private readonly orderDetailsRepository: Repository<OrderDetailsModel>;
  private readonly orderItemsRepository: Repository<OrderItemsModel>;
  private readonly addressRepository: Repository<CustomerAddressModel>;

  constructor(private readonly dataSource: DataSource) {
    this.cartsTableRepository = this.dataSource.getRepository(CartsModel);
    this.orderDetailsRepository = this.dataSource.getRepository(OrderDetailsModel);
    this.orderItemsRepository = this.dataSource.getRepository(OrderItemsModel);
    this.addressRepository = this.dataSource.getRepository(CustomerAddressModel);
  }

  async create(createOrderDto: CreateOrderDto, userInfo: UserType) {
    // Step 1. Fetch All Cart Items matching the Cart IDs + Customer ID
    const cartItems = await this.cartsTableRepository.find({
      where: {
        cartDetailsId: In(createOrderDto.cartIds),
        customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
        isDeleted: false,
        cartStatus: CartStatus.Active,
      },
      relations: ["productDetailsFk"],
    });

    // Step 2. Insert in OrderItems
    const totalPayableAmount = cartItems.reduce((sum, item) => sum + item.productQuantity * item.perProductPrice, 0);

    const orderDetails = this.orderDetailsRepository.create({
      customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId },
      totalAmount: totalPayableAmount,
      orderStatus: "Pending",
      orderDate: new Date(),
    });

    const insertedOrderDetails = await this.orderDetailsRepository.save(orderDetails);

    // Step 3. Insert in OrderItems
    const orderItems = cartItems.map(cartItem => {
      const totalItemAmount = cartItem.productQuantity * cartItem.perProductPrice;

      return this.orderItemsRepository.create({
        quantity: cartItem.productQuantity,
        perQuantityPrice: cartItem.perProductPrice,
        totalAmount: totalItemAmount,
        orderDetailsFk: { orderDetailId: insertedOrderDetails.orderDetailId },
        productDetailsFk: { productDetailsId: cartItem.productDetailsFk.productDetailsId },
      });
    });

    await this.orderItemsRepository.save(orderItems);

    // Step 4. Update Cart Status
    const cartsUpdated = await this.cartsTableRepository.update(
      { cartDetailsId: In(createOrderDto.cartIds) },
      { orderDetailsFk: { orderDetailId: insertedOrderDetails.orderDetailId }, cartStatus: CartStatus["In Checkout"] },
    );

    if (cartsUpdated.affected > 0) {
      this.logger.log(`Created Order Successfully for Customer/User - (${userInfo.name})`);

      throw new CreatedException();
    } else {
      this.logger.warn(`Unbale to create Order for Customer/User - (${userInfo.name})`);

      throw new UnsuccessfulException();
    }
  }

  async updateAddressInOrder(orderId: string, customerAddressId: string, userInfo: UserType) {
    const isOrderAvailable = await this.orderDetailsRepository.findOne({
      where: { orderDetailId: orderId, orderStatus: "Pending", isDeleted: false, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } },
      relations: ["orderItemsFk"],
    });

    if (isOrderAvailable) {
      const updateOrderDetails = await this.orderDetailsRepository.update(
        { orderDetailId: orderId, customerDetailsFk: { customerDetailsId: userInfo.customerDetailsId } },
        { customerAddressFk: { customerAddressId: customerAddressId } },
      );

      if (updateOrderDetails) {
        const addressDetail = await this.addressRepository.findOne({ where: { customerAddressId: customerAddressId, isDeleted: false } });

        // Check if the Order is CGST + SGST (Intra-State) or IGST (Inter-State)
        const isIntraState = addressDetail.state === process.env.BUSINESS_OPERATED_IN_STATE;

        this.logger.log(`Is Intra State (CGST + SGST) or Inter State (IGST) => ${isIntraState}`);

        // Update Tax Details for each Order Item
        const updatedOrderItems = await Promise.all(
          isOrderAvailable.orderItemsFk.map(async orderItem => {
            const { cgstAmount, cgstPercent, igstAmount, igstPercent, sgstAmount, sgstPercent } = calculateTaxForItem(orderItem.perQuantityPrice, orderItem.quantity, isIntraState);

            return {
              orderItemId: orderItem.orderItemId,
              cGstPercent: cgstPercent,
              totalCgstAmount: cgstAmount,
              sGstPercent: sgstPercent,
              totalSgstAmount: sgstAmount,
              iGstPercent: igstPercent,
              totalIgstAmount: igstAmount,
            };
          }),
        );

        // Perform batch update (requires appropriate repository method)
        await this.orderItemsRepository.save(updatedOrderItems);

        this.logger.log(`Updated Customer Address for the Order (${orderId}) Successfully!.`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Update the Customer Address for the Order ID - (${orderId})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Order Found for Order ID - (${orderId})`);

      throw new NotFoundException();
    }
  }

  async getAllCartDetailsBasedOnOrder(orderId: string, userInfo: UserType) {
    // Step 1: Check if the order exists and is pending
    const isOrderAvailable = await this.orderDetailsRepository
      .createQueryBuilder("oD")
      .leftJoinAndSelect("oD.orderItemsFk", "oI")
      .leftJoinAndSelect("oI.productDetailsFk", "pD")
      .leftJoinAndSelect("oD.customerAddressFk", "cA")
      .select([
        "oD.isDeleted",
        "oD.createdAt",
        "oD.updatedAt",
        "oD.orderDetailId",
        "oD.discountAmount",
        "oD.totalAmount",
        "oD.orderStatus",
        "oD.orderDate",
        "oI.isDeleted",
        "oI.createdAt",
        "oI.updatedAt",
        "oI.orderItemId",
        "oI.quantity",
        "oI.perQuantityPrice",
        "oI.totalAmount",
        "oI.cGstPercent",
        "oI.totalCgstAmount",
        "oI.sGstPercent",
        "oI.totalSgstAmount",
        "oI.iGstPercent",
        "oI.totalIgstAmount",
        "pD.productDetailsId",
        "pD.productName",
        "pD.productPrice",
        "pD.productDisplayImage",
        "cA.state",
      ])
      .where("oD.orderDetailId = :orderDetailId", { orderDetailId: orderId })
      .andWhere("oD.orderStatus = :orderStatus", { orderStatus: "Pending" })
      .andWhere("oD.isDeleted = :isDeleted", { isDeleted: false })
      .andWhere("oD.customerDetailsFk.customerDetailsId = :customerDetailsId", { customerDetailsId: userInfo.customerDetailsId })
      .orderBy("oI.createdAt", "DESC")
      .getOne();

    // Check if the Order is CGST + SGST (Intra-State) or IGST (Inter-State)
    const isIntraState = isOrderAvailable.customerAddressFk.state === process.env.BUSINESS_OPERATED_IN_STATE;

    if (isOrderAvailable) {
      // Step 2: Process the Order Items
      let totalItemPrice: number = 0.0;

      const processedItems = isOrderAvailable.orderItemsFk.map(item => {
        const perProductPrice = item.perQuantityPrice * item.quantity;
        totalItemPrice += perProductPrice;

        // Step 1: Calculate Price Before GST
        const priceBeforeGST = totalPriceWithoutGST(item.quantity, totalItemPrice);

        // Step 2: Calculate GST Amount
        const gstAmount = calculateGST(isIntraState ? Number(item.cGstPercent) + Number(item.sGstPercent) : Number(item.iGstPercent), priceBeforeGST);

        // Step 3: Calculate Price With GST (User's Payable Amount)
        const priceWithGST = totalPriceWithGST(priceBeforeGST, gstAmount);

        // Step 4: Total Payable Amount (User's Total)
        const totalPayable = priceWithGST;

        // Step 5: Calculate Payment Gateway Fee for Store Owner
        const paymentGatewayValue = calculatePaymentGatewayFee(Number(process.env.RAZORPAY_PERCENTAGE), priceWithGST);

        // Optional: Deduct Payment Gateway Fee from Store Revenue
        const storeRevenue = totalPayable - paymentGatewayValue;

        return {
          ...isOrderAvailable,
          perProductPrice,
          totalItemPrice,
          priceBeforeGST,
          gstAmount,
          priceWithGST,
          totalPayable,
          paymentGatewayValue,
          storeRevenue,
        };
      });

      return processedItems;
    } else {
      this.logger.error(`No Order Found for Order ID - ${orderId}`);

      throw new NotFoundException(`No Order Found for Order ID - ${orderId}`);
    }
  }

  findAll(userInfo: UserType) {
    return `This action returns all order`;
  }
}
