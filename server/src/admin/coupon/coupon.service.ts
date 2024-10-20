import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

// TypeORM
import { MoreThan, Repository } from "typeorm";

// Momentjs
import moment from "moment";

// Custom Exception Filter
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// DTO (Data Transfer Object)
import { CreateCouponDto } from "./dto/create-coupon.dto";
import { UpdateCouponDto } from "./dto/update-coupon.dto";

// Model
import { CouponDetailsModel } from "./entities/coupon.entity";
import { CouponUsageModel } from "./entities/coupon-usage.entity";

@Injectable()
export class CouponService {
  constructor(
    @InjectRepository(CouponDetailsModel) private readonly couponDetailsRepository: Repository<CouponDetailsModel>,
    @InjectRepository(CouponUsageModel) private readonly couponUsageRepository: Repository<CouponUsageModel>,
  ) {}
  private readonly logger = new Logger("AdminCoupons");

  async create(createCouponDto: CreateCouponDto): Promise<CouponDetailsModel> {
    const couponPayload = {
      ...createCouponDto,
      remainingQuantity: createCouponDto.totalQuantity,
    };

    const couponData = await this.couponDetailsRepository.save(couponPayload);

    if (couponData) {
      this.logger.log(`Cupon Created Successfully => (${createCouponDto.code})`);

      return couponData;
    } else {
      this.logger.log("Unable to create Coupon.");

      throw new UnsuccessfulException();
    }
  }

  async findAll(): Promise<{ count: number; rows: CouponDetailsModel[] }> {
    const [rows, count] = await this.couponDetailsRepository.findAndCount({
      where: { isDeleted: false, remainingQuantity: MoreThan(0) },
      order: { createdAt: "DESC" },
      loadEagerRelations: false, // used to exclude the Relation Table
    });

    if (count > 0) {
      this.logger.log(`Found Total ${count} Coupons`);

      return { count, rows };
    } else {
      this.logger.log("No Coupons Found!.");

      throw new NotFoundException("No Coupons Found");
    }
  }

  async findOne(id: string): Promise<CouponDetailsModel> {
    const isCouponsAvailable = await this.couponDetailsRepository.findOne({ where: { couponDetailsId: id, isDeleted: false, remainingQuantity: MoreThan(0) } });

    if (isCouponsAvailable) {
      this.logger.log(`Found Coupon -- (Code: ${isCouponsAvailable.code}) and Remaining Qty is (${isCouponsAvailable.remainingQuantity})`);

      return isCouponsAvailable;
    } else {
      this.logger.log(`Coupon you are looking for with ID (${id}) is not available. Please check the ID`);
    }
  }

  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<CouponDetailsModel> {
    const isCouponsAvailable = await this.couponDetailsRepository.findOne({ where: { couponDetailsId: id, isDeleted: false } });

    if (isCouponsAvailable) {
      // Check if the Coupon has expired
      const currentDate: Date = new Date();

      if (currentDate > isCouponsAvailable.expiryDate) {
        this.logger.log(`Coupon Code - (${isCouponsAvailable.code}) has expired.`);

        throw new UnsuccessfulException("Cannot update an expired Coupon.");
      }

      // Check if the coupon has already been used.
      const couponUsageCount = await this.couponUsageRepository.count({ where: { couponDetailsId: isCouponsAvailable } });

      if (couponUsageCount > 0) {
        if (updateCouponDto.discountAmount || updateCouponDto.discountPercentage || updateCouponDto.totalQuantity) {
          this.logger.log("Cannot update discount amount or Total Quantity for a Coupon that has been used!.");

          throw new UnsuccessfulException("Cannot update discount amount or Total Quantity for a Coupon that has been used!.");
        }
      }

      // Restrict the Changing of Coupon Code once it has been created!.
      if (updateCouponDto.code && updateCouponDto.code !== isCouponsAvailable.code) {
        this.logger.log("Coupon code cannot be changed after creation!.");

        throw new UnsuccessfulException("Coupon code cannot be changed after creation!.");
      }

      // Prevent total quantity from being reduced below usage
      const totalUsed = isCouponsAvailable.totalQuantity - isCouponsAvailable.remainingQuantity;
      if (updateCouponDto.totalQuantity && updateCouponDto.totalQuantity < totalUsed) {
        this.logger.log(`Cannot reduce total quantity below usage count (${totalUsed}).`);

        throw new UnsuccessfulException(`Total quantity cannot be less than the number of times the coupon has already been used (${totalUsed}).`);
      }

      // Edge Case 2: Check if the coupon's total quantity has been exhausted
      if (isCouponsAvailable.remainingQuantity <= 0) {
        this.logger.log(`Cannot update a coupon (${isCouponsAvailable.code}) with 0 remaining quantity`);

        throw new UnsuccessfulException("Cannot update a coupon with 0 remaining quantity");
      }

      // Allow expiry date to be extended, but not shortened if the coupon has been used.
      if (updateCouponDto.expiryDate) {
        const newExpiryDate = moment(updateCouponDto.expiryDate);
        const existingExpiryDate = moment(isCouponsAvailable.expiryDate);

        if (couponUsageCount > 0 && newExpiryDate.isBefore(existingExpiryDate)) {
          this.logger.log(`Cannot shorten Expiry Date for a Coupon (${isCouponsAvailable.code}) that has been used more than ${couponUsageCount} times.`);

          throw new UnsuccessfulException(`Cannot shorten Expiry Date for a Coupon (${isCouponsAvailable.code}) that has been used more than ${couponUsageCount} times.`);
        }
      }

      // Update start date: You can update the start date if it's in the future, otherwise restrict it
      if (updateCouponDto.startDate) {
        const anotherCurrentDate = moment();
        if (anotherCurrentDate.isAfter(moment(isCouponsAvailable.startDate))) {
          this.logger.log("Cannot change the start date after the coupon has started");

          throw new UnsuccessfulException("Cannot change the start date after the coupon has started");
        } else {
          isCouponsAvailable.startDate = updateCouponDto.startDate;
        }
      }

      // Update total quantity: If no usage has occurred, allow increasing the total quantity
      if (updateCouponDto.totalQuantity && isCouponsAvailable.remainingQuantity === isCouponsAvailable.totalQuantity) {
        isCouponsAvailable.totalQuantity = updateCouponDto.totalQuantity;
        isCouponsAvailable.remainingQuantity = updateCouponDto.totalQuantity;
      }

      // Update discount values: Allow updates only if the coupon hasn't been used
      if (isCouponsAvailable.remainingQuantity === isCouponsAvailable.totalQuantity) {
        if (updateCouponDto.discountPercentage) {
          isCouponsAvailable.discountPercentage = updateCouponDto.discountPercentage;
        }

        if (updateCouponDto.discountAmount) {
          isCouponsAvailable.discountAmount = updateCouponDto.discountAmount;
        }
      }

      const updatedData = await this.couponDetailsRepository.save(isCouponsAvailable);

      return updatedData;
    } else {
      this.logger.log(`No Coupon Details Found with Coupons ID - (${id})`);

      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isCouponsAvailable = await this.couponDetailsRepository.findOne({ where: { couponDetailsId: id, isDeleted: false, remainingQuantity: 0, isActive: false } });

    if (isCouponsAvailable) {
      const updatedData = await this.couponDetailsRepository.update({ couponDetailsId: id }, { isDeleted: true });

      if (updatedData) {
        this.logger.log(`Successfully Deleted (isDeleted: true) for Coupon Code - (${isCouponsAvailable.code})`);

        throw new SuccessException();
      } else {
        this.logger.log(`Unable to Delete - (${isCouponsAvailable.code}). Please try again later.`);
      }
    } else {
      this.logger.log("Coupon Details not found!.");

      throw new NotFoundException();
    }
  }
}
