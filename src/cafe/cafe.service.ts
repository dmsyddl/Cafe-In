import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cafe } from './cafe.entity';

@Injectable()
export class CafeService implements OnModuleInit {
    constructor(
        @InjectRepository(Cafe)
        private cafeRepository: Repository<Cafe>,
    ) {}

    async onModuleInit() {
        const cafes = await this.cafeRepository.find();
    }

    async findAll(): Promise<Cafe[]> {
        return this.cafeRepository.find({relations: ['keywords']});
    }

    async saveCafes(items: Partial<Cafe>[]): Promise<Cafe[]> {
        const cafes = items.map((item) => ({
            title: (item.title ?? '').replace(/<[^>]*>/g, ''),
            link: item.link,
            description: item.description,
            address: item.address,
            roadAddress: item.roadAddress,
            mapx: item.mapx,
            mapy: item.mapy,
        }));

        await this.cafeRepository.upsert(cafes, {
            conflictPaths: ['address'],
            skipUpdateIfNoValuesChanged: true,
        });

        const addresses = cafes.map((c) => c.address);
        return this.cafeRepository.find({ where: { address: In(addresses) } });
    }
}
