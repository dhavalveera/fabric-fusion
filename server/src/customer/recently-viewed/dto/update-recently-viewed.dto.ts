import { PartialType } from '@nestjs/mapped-types';
import { CreateRecentlyViewedDto } from './create-recently-viewed.dto';

export class UpdateRecentlyViewedDto extends PartialType(CreateRecentlyViewedDto) {}
