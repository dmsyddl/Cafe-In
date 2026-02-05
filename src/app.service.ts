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
        console.log('네이버 API 검색 시작');

        const url = 'https://openapi.naver.com/v1/search/local.json';
        const cilentId = this.configService.get<string>('NAVER_CLIENT_ID');
        const secretId = this.configService.get<string>('NAVER_SECRET_ID');

        const response = await firstValueFrom(
            this.httpService.get(url, {
                params: { query: keyword, display: 100},
                headers: {
                    'X-Naver-Client-Id': cilentId,
                    'X-Naver-Client-Secret': secretId,
                }
            })
        )

        const cafeName = response.data.items[0].title;
        const cafeAddress = response.data.items[0].address;

        return {cafeName, cafeAddress};
    }
}
