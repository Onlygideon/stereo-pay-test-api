import { QueryService } from '@nestjs-query/core';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { paginate } from 'nestjs-typeorm-paginate/dist/paginate';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { Repository } from 'typeorm';
import { Media } from './../entities/Media';
import { UpateMediaDto } from './dto/media.dto.js';
import {MediaInterface} from "./interface/media.interface.js"

@QueryService(Media)
export class MediaService extends TypeOrmQueryService<Media> {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepo: Repository<Media>,
  ) {
    super(mediaRepo, { useSoftDelete: true });
  }

  async createMedia(media: MediaInterface): Promise<Media> {
    return await this.mediaRepo.save(media);
  }

  async getSingleMedia(id: string): Promise<Media> {
    return await this.mediaRepo.findOneBy({ id, deletedAt: null });
  }

  async searchMediaByTitleAndDescription(
    title: string,
    desc: string,
  ): Promise<Media[]> {
    return this.mediaRepo
      .createQueryBuilder('media')
      .where('media.title LIKE :title', { title: `%${title}%` })
      .orWhere('media.description LIKE :desc', { desc: `%${desc}%` })
      .getMany();
  }

  async paginateAndGetAllMedia(
    options: IPaginationOptions,
  ): Promise<Pagination<Media>> {
    const querybuilder = this.mediaRepo.createQueryBuilder('media');
    querybuilder.orderBy('media.createdAt', 'DESC');

    return paginate<Media>(querybuilder, options);
  }

  async updateMedia(id: string, mediaDto: UpateMediaDto): Promise<any> {
    return await this.mediaRepo.update(id, mediaDto);
  }

  async softDeleteMedia(id: string): Promise<void> {
    await this.mediaRepo.softDelete(id);
  }
}
