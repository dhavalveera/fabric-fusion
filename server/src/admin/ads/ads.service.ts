import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";

// TypeORM
import { Repository } from "typeorm";

// Custom Exceptions
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// Cache Invalidator Keys
import { CUSTOMER_CACHE_KEYS } from "src/constants/cache-keys";

// DTO (Data Transfer Object)
import { CreateAdDto } from "./dto/create-ad.dto";
import { UpdateAdDto } from "./dto/update-ad.dto";

// Model
import { AdsModel } from "./entities/ad.entity";

@Injectable()
export class AdsService {
  constructor(
    @InjectRepository(AdsModel) private readonly adsRepository: Repository<AdsModel>,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  private readonly logger = new Logger("AdminAdsService");

  async create(createAdDto: CreateAdDto) {
    const adsData = await this.adsRepository.save(createAdDto);

    if (adsData) {
      this.logger.log("Ads created Successfully!.");

      this.eventEmitter.emit(CUSTOMER_CACHE_KEYS.ADS);

      throw new SuccessException();
    } else {
      this.logger.log("Unable to Create Ads");

      throw new UnsuccessfulException();
    }
  }

  async findAll(): Promise<{ rows: AdsModel[]; count: number }> {
    const [rows, count] = await this.adsRepository.findAndCount({ where: { isActive: true, isDeleted: false }, order: { createdAt: "DESC" } });

    if (count > 0) {
      this.logger.log(`Found total ${count} Ads.`);

      return { count, rows };
    } else {
      this.logger.log("No Ads Found!.");

      throw new NotFoundException();
    }
  }

  async findOne(id: string): Promise<AdsModel> {
    const isAdsAvailable = await this.adsRepository.findOne({ where: { adsId: id, isActive: true, isDeleted: false } });

    if (isAdsAvailable) {
      this.logger.log(`Found Ads with ID - ${isAdsAvailable.adsId} & Title - ${isAdsAvailable.imgTitle}`);

      return isAdsAvailable;
    } else {
      this.logger.log(`No Ads Found based on Ads ID -- (${id})`);

      throw new NotFoundException();
    }
  }

  async update(id: string, updateAdDto: UpdateAdDto) {
    const isAdsAvailable = await this.adsRepository.findOne({ where: { adsId: id, isActive: true, isDeleted: false } });

    if (isAdsAvailable) {
      const updatedData = await this.adsRepository.update({ adsId: id }, updateAdDto);

      if (updatedData) {
        this.logger.log(`Updated Ads Successfully!.`);

        throw new SuccessException();
      } else {
        this.logger.log(`Unable to Update Ads with Ads ID - (${id}) with Name - (${isAdsAvailable.imgTitle})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.log(`Unable to find Ads with Ads ID - (${id})`);

      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isAdsAvailable = await this.adsRepository.findOne({ where: { adsId: id, isActive: true, isDeleted: false } });

    if (isAdsAvailable) {
      const updatedAdsData = await this.adsRepository.update({ adsId: id }, { isDeleted: true });

      if (updatedAdsData) {
        this.logger.log(`Ads Deleted Successfully with Ads ID - (${id}) & Name - (${isAdsAvailable.imgTitle})`);

        throw new SuccessException();
      } else {
        this.logger.log(`Unable to Deleted (isDeleted) the Ads ID - (${id}) & Name - (${isAdsAvailable.imgTitle})`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.log(`No Ads found based on Ads ID - (${id})`);
    }
  }
}
