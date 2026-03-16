import { Controller, Get } from '@nestjs/common';
import { CafeService } from './cafe.service';

@Controller('cafes')
export class CafeController {
    constructor(private readonly cafeService: CafeService) {}

    @Get()
    async findAll() {
        return this.cafeService.findAll();
    }
}
