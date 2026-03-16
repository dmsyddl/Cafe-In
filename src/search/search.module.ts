import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { SearchService } from './search.service';
import { CafeModule } from '../cafe/cafe.module';

@Module({
  imports: [HttpModule, CafeModule],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
