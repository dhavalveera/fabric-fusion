import { ConflictException, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EventEmitter2 } from "@nestjs/event-emitter";

// TypeORM
import { Repository } from "typeorm";

// Custom Exception Filters
import { CreatedException } from "src/exception-filters/created.exception";
import { NotFoundException } from "src/exception-filters/not-found.exception";
import { SuccessException } from "src/exception-filters/success.exception";
import { UnsuccessfulException } from "src/exception-filters/unsuccessful.exception";

// CONSTANTS
import { STATIC_PAGE_CACHE_KEYS } from "src/constants/cache-keys";

// Model
import { StaticPageModel } from "./entities/static-page.entity";

// ENUM
import { StaticPageType } from "./constants";

// DTO
import { CreateStaticPageDto } from "./dto/create-static-page.dto";
import { UpdateStaticPageDto } from "./dto/update-static-page.dto";

@Injectable()
export class StaticPagesService {
  private readonly logger = new Logger(StaticPagesService.name);

  constructor(
    @InjectRepository(StaticPageModel) private readonly staticPageRepository: Repository<StaticPageModel>,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createStaticPage(createStaticPageDto: CreateStaticPageDto) {
    const isStaticPageContentAvailable = await this.staticPageRepository.findOne({ where: { pageType: createStaticPageDto.pageType, isDeleted: false } });

    if (!isStaticPageContentAvailable) {
      const createdStaticPage = await this.staticPageRepository.save(createStaticPageDto);

      if (createdStaticPage) {
        this.logger.log(`Created Static Page Content for ${createdStaticPage.pageType} Successfully!.`);

        this.eventEmitter.emit(STATIC_PAGE_CACHE_KEYS[createdStaticPage.pageType]);

        throw new CreatedException();
      } else {
        this.logger.warn(`Unable to create Static Page Content for ${createStaticPageDto.pageType}.`);

        throw new UnsuccessfulException();
      }
    } else {
      this.logger.error(`Static Page Content already available for ${createStaticPageDto.pageType}!. You cannot create once again.`);

      throw new ConflictException(`Static Page Content already exists for ${createStaticPageDto.pageType}`);
    }
  }

  async findAll(): Promise<{ rows: StaticPageModel[]; count: number }> {
    const [rows, count] = await this.staticPageRepository.findAndCount({
      where: { isDeleted: false },
      order: { createdAt: "DESC" },
      select: ["staticPageId", "createdAt", "isDeleted", "pageType", "updatedAt"],
    });

    if (count > 0) {
      this.logger.log(`Found ${count} Static Page Content!.`);

      return { count, rows };
    } else {
      this.logger.warn(`No Static Page Contents Found!.`);

      throw new NotFoundException();
    }
  }

  async findStaticPageContent(pageType: StaticPageType): Promise<StaticPageModel> {
    const isStaticPageContentAvailable = await this.staticPageRepository.findOne({ where: { pageType, isDeleted: false } });

    if (isStaticPageContentAvailable) {
      this.logger.log(`Found Static Page Content for ${pageType}`);

      return isStaticPageContentAvailable;
    } else {
      this.logger.warn(`No Static Page Content Found for ${pageType}`);

      throw new NotFoundException();
    }
  }

  async updateStaticPageContent(id: string, updatePageContent: UpdateStaticPageDto) {
    const isStaticPageContentAvailable = await this.staticPageRepository.findOne({ where: { staticPageId: id, isDeleted: false } });

    if (isStaticPageContentAvailable) {
      const updatedContent = await this.staticPageRepository.update({ staticPageId: id, isDeleted: false }, updatePageContent);

      if (updatedContent) {
        this.logger.log(`Successfully Updated Static Page Content for ${isStaticPageContentAvailable.pageType}`);

        this.eventEmitter.emit(STATIC_PAGE_CACHE_KEYS[isStaticPageContentAvailable.pageType]);

        throw new SuccessException(`Successfully Updated Static Page Content for ${isStaticPageContentAvailable.pageType}`);
      } else {
        this.logger.warn(`Unable to update Page Static Page Content for ${isStaticPageContentAvailable.pageType}`);

        throw new UnsuccessfulException(`Unable to update Page Static Page Content for ${isStaticPageContentAvailable.pageType}`);
      }
    } else {
      this.logger.warn(`No Static Page Content Found!.`);

      throw new NotFoundException();
    }
  }

  async deleteStaticPage(id: string, pageType: StaticPageType) {
    const isStaticPageContentAvailable = await this.staticPageRepository.findOne({ where: { staticPageId: id, pageType, isDeleted: false } });

    if (isStaticPageContentAvailable) {
      const deletedContent = await this.staticPageRepository.update({ staticPageId: id, pageType }, { isDeleted: true });

      if (deletedContent) {
        this.logger.log(`Successfully (Soft) Deleted Static Page -- ${pageType}`);

        this.eventEmitter.emit(STATIC_PAGE_CACHE_KEYS[isStaticPageContentAvailable.pageType]);

        throw new SuccessException(`Successfully (Soft) Deleted Static Page -- ${pageType}`);
      } else {
        this.logger.warn(`Unable to Delete Page Static Page Content for ${isStaticPageContentAvailable.pageType}`);

        throw new UnsuccessfulException(`Unable to Delete Page Static Page Content for ${isStaticPageContentAvailable.pageType}`);
      }
    } else {
      this.logger.error(`No Static Page Content Found ${pageType}!.`);

      throw new NotFoundException(`No Static Page Content Found ${pageType}!.`);
    }
  }
}
