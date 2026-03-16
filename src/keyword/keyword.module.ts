import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KeywordController } from './keyword.controller';
import { KeywordService } from './keyword.service';
import { Keyword } from './keyword.entity';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([Keyword]), SearchModule],
  controllers: [KeywordController],
  providers: [KeywordService],
})
export class KeywordModule {}
