import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cafe } from './cafe.entity';
import { CafeController } from './cafe.controller';
import { CafeService } from './cafe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cafe])],
  controllers: [CafeController],
  providers: [CafeService],
  exports: [CafeService],
})
export class CafeModule {}
