import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";

// TypeORM
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

// Custom Exception Filter
import { CreatedException } from "src/exception-filters/created.exception";
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// DTO (Data Transfer Object)
import { CreateRegionTagDto } from "./dto/create-region-tag.dto";
import { UpdateRegionTagDto } from "./dto/update-region-tag.dto";

// Model
import { RegionTagModel } from "./entities/region-tag.entity";

@Injectable()
export class RegionTagsService {
  private readonly logger = new Logger(`Admin${RegionTagsService.name}`);

  constructor(@InjectRepository(RegionTagModel) private readonly regionTagRepository: Repository<RegionTagModel>) {}

  async create(createRegionTagDto: CreateRegionTagDto) {
    const isProdRegionAvailable = await this.regionTagRepository.findOne({ where: { regionTagName: createRegionTagDto.regionTagName, isDeleted: false } });

    if (isProdRegionAvailable) {
      this.logger.error(`Product Region Name (${createRegionTagDto.regionTagName}) Already Available!.`);

      throw new HttpException(`Product Region Name (${createRegionTagDto.regionTagName}) Already Available!.`, HttpStatus.CONFLICT);
    } else {
      const createdRegionTag = this.regionTagRepository.create({
        regionTagName: createRegionTagDto.regionTagName,
        regionTagDescription: createRegionTagDto.description,
      });

      const regionTagData = await this.regionTagRepository.save(createdRegionTag);

      if (regionTagData) {
        this.logger.log(`${createRegionTagDto.regionTagName} Product Region Tag Created Successfully!.`);

        throw new CreatedException();
      } else {
        this.logger.warn(`Unable to create Product Region Tag. Please try again later.`);

        throw new UnsuccessfulException();
      }
    }
  }

  async findAll(pageNumber: string, pageSize: string): Promise<{ count: number; rows: RegionTagModel[] }> {
    const [rows, count] = await this.regionTagRepository.findAndCount({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
      take: Number(pageSize),
      skip: Number(pageSize) * Number(pageNumber),
    });

    if (count > 0) {
      this.logger.log(`Found total ${count} Product Region Tags.`);

      return { count, rows };
    } else {
      this.logger.warn(`No Product Region Tags were Found!.`);

      throw new UnsuccessfulException();
    }
  }

  async findAllWithPagination(): Promise<{ count: number; rows: RegionTagModel[] }> {
    const [rows, count] = await this.regionTagRepository.findAndCount({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
    });

    if (count > 0) {
      this.logger.log(`Found total ${count} Product Region Tags.`);

      return { count, rows };
    } else {
      this.logger.warn(`No Product Region Tags were Found!.`);

      throw new UnsuccessfulException();
    }
  }

  async findOne(id: string): Promise<RegionTagModel> {
    const isProdRegionAvailable = await this.regionTagRepository.findOne({
      where: {
        productRegionTagId: id,
        isDeleted: false,
      },
    });

    if (isProdRegionAvailable) {
      this.logger.log(`Product Region Tag (${isProdRegionAvailable.regionTagName}) Found!.`);

      return isProdRegionAvailable;
    } else {
      this.logger.error(`No Product Region Tag Found for Region Tag ID - (${id})`);

      throw new NotFoundException();
    }
  }

  async update(id: string, updateRegionTagDto: UpdateRegionTagDto) {
    const isProdRegionAvailable = await this.regionTagRepository.findOne({
      where: {
        productRegionTagId: id,
        isDeleted: false,
      },
    });

    if (isProdRegionAvailable) {
      this.logger.log(`Product Region Tag (${isProdRegionAvailable.regionTagName}) Found!.`);

      const updatedRegionTag = await this.regionTagRepository.update(
        { productRegionTagId: id, isDeleted: false },
        {
          regionTagName: updateRegionTagDto.regionTagName,
          regionTagDescription: updateRegionTagDto.description,
        },
      );

      if (updatedRegionTag) {
        this.logger.log(`Updated Region Tag (${updateRegionTagDto.regionTagName}) Successfully!.`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Update the Product Region Tag. Please try again later.`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Product Region Tag Found for Region Tag ID - (${id})`);

      throw new NotFoundException();
    }
  }

  async remove(id: string) {
    const isProdRegionAvailable = await this.regionTagRepository.findOne({
      where: {
        productRegionTagId: id,
        isDeleted: false,
      },
    });

    if (isProdRegionAvailable) {
      this.logger.log(`Product Region Tag (${isProdRegionAvailable.regionTagName}) Found!.`);

      const updatedRegionTag = await this.regionTagRepository.update({ productRegionTagId: id, isDeleted: false }, { isDeleted: true });

      if (updatedRegionTag) {
        this.logger.log(`Deleted Region Tag (${isProdRegionAvailable.regionTagName}) Successfully!.`);

        throw new SuccessException();
      } else {
        this.logger.warn(`Unable to Update the Product Region Tag. Please try again later.`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`No Product Region Tag Found for Region Tag ID - (${id})`);

      throw new NotFoundException();
    }
  }
}
