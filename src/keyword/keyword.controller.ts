import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { KeywordService } from './keyword.service';

@Controller('keywords')
export class KeywordController {
    constructor(private readonly keywordService: KeywordService) {}

    @Post()
    async create(@Body('name') name: string) {
        return this.keywordService.create(name);
    }

    @Get()
    async findAll() {
        return this.keywordService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        return this.keywordService.remove(id);
    }

    @Post(':id/search')
    async search(@Param('id') id: number) {
        return this.keywordService.search(id);
    }

    @Get(':id/cafes')
    async searchKeyword(@Param('id') id: number) {
        return this.keywordService.searchKeyword(id);
    }
}
