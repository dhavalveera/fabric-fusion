import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { Repository } from "typeorm";

// Custom Exception
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Utils
import { capitalizeFirstLetter } from "src/utils/make-capitalize";

// DTO (Data Transfer Object)
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";

// Model
import { OrderDetailsModel } from "./entities/order.entity";
import { OrderItemsModel } from "./entities/order-items.entity";

// types
import { FindAllResp, OrderStatusType } from "./types/interfaces";

@Injectable()
export class OrdersService {
  private readonly logger = new Logger("AdminOrderDetails");

  constructor(
    @InjectRepository(OrderDetailsModel) private readonly orderDetailsRepository: Repository<OrderDetailsModel>,
    @InjectRepository(OrderItemsModel) private readonly orderItemsRepository: Repository<OrderItemsModel>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderDetailsModel> {
    const createOrdersPaylaod = this.orderDetailsRepository.create(createOrderDto);

    const orderDetailsPayload = await this.orderDetailsRepository.save(createOrdersPaylaod);

    if (orderDetailsPayload) {
      this.logger.log(`Order Created Successfully with Order ID - ${orderDetailsPayload.orderDetailId}`);

      return orderDetailsPayload;
    } else {
      this.logger.warn(`Unable to Create Order!.`);

      throw new UnsuccessfulException();
    }
  }

  async findAll(pageNumber: number, pageSize: number, orderStatus: OrderStatusType): Promise<FindAllResp> {
    const [rows, count] = await this.orderDetailsRepository.findAndCount({
      where: { isDeleted: false, orderStatus },
      order: { createdAt: "DESC" },
      take: pageSize,
      skip: pageSize * pageNumber,
      loadEagerRelations: false,
    });

    if (count > 0) {
      this.logger.log(`Found Total ${count} of Orders.`);

      return { count, rows };
    } else {
      this.logger.log(`No ${capitalizeFirstLetter(orderStatus)} Orders Found!.`);

      throw new NotFoundException(`No ${capitalizeFirstLetter(orderStatus)} Orders Found!.`);
    }
  }

  async findOne(id: string): Promise<OrderDetailsModel> {
    const isOrderDetailsAvailable = await this.orderDetailsRepository.findOne({ where: { orderDetailId: id, isDeleted: false } });

    if (isOrderDetailsAvailable) {
      this.logger.log(`Found Order Details with ID - (${isOrderDetailsAvailable.orderDetailId})`);

      return isOrderDetailsAvailable;
    } else {
      this.logger.warn(`No Order Details found with Order ID - (${id})`);

      throw new NotFoundException(`No Order Details found with Order ID - (${id})`);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const isOrderDetailsAvailable = await this.orderDetailsRepository.findOne({ where: { orderDetailId: id, isDeleted: false } });

    if (!isOrderDetailsAvailable) {
      this.logger.warn(`No Order Details found for orderDetailsId - (${id})`);

      throw new NotFoundException(`No Order Details found for orderDetailsId - (${id})`);
    }

    // Allow status updates only for certain status (e.g. Pending or Processing)
    const allowedStatues: Array<string> = ["pending", "processing"];

    if (!allowedStatues.includes(updateOrderDto.orderStatus)) {
      this.logger.warn(`Order status for ID (${id}) is not eligible for update.`);
      throw new UnsuccessfulException(`Order status cannot be updated from current status (${isOrderDetailsAvailable.orderStatus}).`);
    }

    // Proceed with the update
    const updatedData = await this.orderDetailsRepository.update({ orderDetailId: id, isDeleted: false }, updateOrderDto);

    if (updatedData) {
      this.logger.log(`Updated Order Status successfully with orderDetailsId - ${isOrderDetailsAvailable.orderDetailId}`);

      throw new SuccessException();
    } else {
      this.logger.log(`Unable to Update the Order Details with ID - (${id})`);

      throw new UnsuccessfulException(`Unable to Update the Order Details with ID - (${id})`);
    }
  }
}
