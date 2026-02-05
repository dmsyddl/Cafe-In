import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
    constructor(
        private readonly httpService: HttpService,
    ) {}
    async cafeSearch(): Promise<void> {
        console.log('네이버 API 검색 시작');

        const url = 'https://openapi.naver.com/v1/search/local.json';
        const { data } = await firstValueFrom(this.httpService.get(url));
    }
}
