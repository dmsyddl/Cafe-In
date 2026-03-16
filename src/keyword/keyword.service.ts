import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Keyword } from './keyword.entity';
import { SearchService } from '../search/search.service';

@Injectable()
export class KeywordService {
    constructor(
        @InjectRepository(Keyword)
        private keywordRepository: Repository<Keyword>,
        private readonly searchService: SearchService,
    ) {}

    async create(name: string): Promise<Keyword> {
        const keyword = this.keywordRepository.create({ name });
        return this.keywordRepository.save(keyword);
    }

    async findAll(): Promise<Keyword[]> {
        return this.keywordRepository.find();
    }

    async remove(id: number): Promise<void> {
        await this.keywordRepository.delete(id);
    }

    async search(id: number): Promise<boolean> {
        const keyword = await this.keywordRepository.findOneBy({ id });
        if (!keyword) {
            throw new Error(`키워드(id: ${id})를 찾을 수 없습니다.`);
        }
        return this.searchService.searchAndSave(keyword.name);
    }
}
