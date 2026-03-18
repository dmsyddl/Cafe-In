import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CafeService } from '../cafe/cafe.service';

@Injectable()
export class SearchService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        private readonly cafeService: CafeService,
    ) {}

    async searchAndSave(keyword: string): Promise<any[]> {
        const NAVER_API_URL = this.configService.get<string>('NAVER_API_URL');
        const NAVER_CLIENT_ID = this.configService.get<string>('NAVER_CLIENT_ID');
        const NAVER_SECRET_ID = this.configService.get<string>('NAVER_SECRET_ID');

        const url = NAVER_API_URL + '/v1/search/local.json';
        const response = await firstValueFrom(
            this.httpService.get(url, {
                params: { query: keyword, display: 5 },
                headers: {
                    'X-Naver-Client-Id': NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': NAVER_SECRET_ID,
                },
            }),
        );

        if (response.data.items.length === 0) {
            console.log('조회된 카페가 없음');
            return [];
        }

        const cafes = await this.cafeService.saveCafes(response.data.items);
        return cafes;
    }
}
