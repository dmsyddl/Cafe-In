import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { KeywordService } from './keyword.service';
import { CreateKeywordDto } from "./dto/create-keyword.dto"

@Controller('keywords')
export class KeywordController {
    constructor(private readonly keywordService: KeywordService) {}

    @Post()
    async create(@Body('name') dto: CreateKeywordDto) {
        return this.keywordService.create(dto.name);
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
    async searchCafe(@Param('id') id: number) {
        return this.keywordService.searchCafe(id);
    }
}
