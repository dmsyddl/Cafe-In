import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
    ) {}

    async cafeSearch(keyword: string) {
        const NAVER_API_URL = this.configService.get<string>('NAVER_API_URL');
        const NAVER_CLIENT_ID = this.configService.get<string>('NAVER_CLIENT_ID');
        const NAVER_SECRET_ID = this.configService.get<string>('NAVER_SECRET_ID');

        const url = NAVER_API_URL + '/v1/search/local.json';
        const response = await firstValueFrom(
            this.httpService.get(url, {
                params: { query: keyword, display: 5},
                headers: {
                    'X-Naver-Client-Id': NAVER_CLIENT_ID,
                    'X-Naver-Client-Secret': NAVER_SECRET_ID,
                }
            })
        )

        return response.data;
    }
}
