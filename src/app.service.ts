import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Cafe } from './cafe/cafe.entity';

@Injectable()
export class AppService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        
        @InjectRepository(Cafe)
        private cafeRepository: Repository<Cafe>
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
        
        let cafes: Partial<Cafe>[] = [];
        if (response.data.items.length > 0) {
            cafes = response.data.items.map((item: Cafe) => ({
                title: item.title.replace(/<[^>]*>/g, ''),
                link: item.link,
                description: item.description,
                address: item.address,
                roadAddress: item.roadAddress,
                mapx: item.mapx,
                mapy: item.mapy,
            }))
            await this.cafeRepository.upsert(cafes, {
                conflictPaths: ['address'],
                skipUpdateIfNoValuesChanged: true, // 불필요한 DB업데이트를 막는다.
            })
            console.log('조회한 카페 저장 성공');
        } else {
            console.log('조회된 카페가 없음');
            return false;
        }

        return true;
    }
}
