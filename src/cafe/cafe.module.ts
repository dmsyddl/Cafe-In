import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from './cafe.entity';
import { CafeService } from './cafe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe])],
  providers: [CafeService],
  exports: [CafeService],
})
export class CafeModule {}
