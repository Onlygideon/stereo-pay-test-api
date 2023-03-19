import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Body, Delete, Patch, Query } from '@nestjs/common/decorators/index.js';
import { FileInterceptor } from '@nestjs/platform-express/multer/index.js';
import { diskStorage, MulterError } from 'multer';
import path, { join } from 'path';
import { v4 as uuidV4 } from 'uuid';
import { UpateMediaDto } from './dto/media.dto.js';
import { MediaInterface } from './interface/media.interface.js';
import { MediaService } from './media.service';

@Controller('api/media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('add')
  @UseInterceptors(
    FileInterceptor('media', {
      fileFilter: (req, file, cb) => {
        if (
          file.originalname.match(/^.*\.(jpg|webp|png|jpeg|mp3|wav|m4a|PNG)$/)
        )
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'media'), false);
        }
      },

      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, join(__dirname, '..', '..', 'src/uploads/media'));
        },

        filename: (req, file, cb) => {
          cb(null, uuidV4() + file.originalname);
        },
      }),
    }),
  )
  addMedia(@UploadedFile() media): Object {
    const mediaObject: MediaInterface = {
      name: media.filename.toString(),
      title: media.originalname.split('.')[0]?.toString()?.toLowerCase(),
      description: String(Math.floor(Math.random() * 1000) + 1),
      type: media.mimetype.split('/')[0],
      status: 'active',
      url: media.path.toString(),
    };

    const uploadMedia = this.mediaService.createMedia(mediaObject);
    if (uploadMedia) {
      return {
        status: 'success',
        message: 'media object uploaded successfully',
      };
    } else {
      return {
        status: 'error',
        message: `failed to upload the media object with file name ${media.originalname}`,
      };
    }
  }

  @Get('fetch/:mediaId')
  async fetchMedia(@Param('mediaId') mediaId): Promise<Object> {
    const getMedia = await this.mediaService.getSingleMedia(mediaId);
    if (getMedia) {
      return {
        status: 'success',
        message: `Successfully fetched media object with the id of ${mediaId}`,
        data: getMedia,
      };
    } else {
      return {
        status: 'error',
        message: `failed to fetch media object with the id of ${mediaId} due to invalid Id or already deleted`,
      };
    }
  }

  @Get('search?')
  async searchMedia(
    @Query('title') title: string,
    @Query('desc') desc: string,
  ): Promise<Object> {
    const searchMedia =
      await this.mediaService.searchMediaByTitleAndDescription(
        title?.toLowerCase(),
        desc,
      );
    if (searchMedia) {
      return {
        status: 'success',
        message: `Successfully searched media objects`,
        data: searchMedia,
      };
    } else {
      return {
        status: 'error',
        message: `failed to search media objects`,
      };
    }
  }

  @Get('all?')
  async fetchAllMedia(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('perPage', new DefaultValuePipe(10), ParseIntPipe) perPage: number,
  ): Promise<Object> {
    const options: IPaginationOptions = {
      limit: perPage,
      page,
    };

    const paginatemedia = await this.mediaService.paginateAndGetAllMedia(
      options,
    );
    if (paginatemedia) {
      return {
        status: 'success',
        message: `Successfully fetched paginated media objects`,
        data: paginatemedia,
      };
    } else {
      return {
        status: 'error',
        message: `failed to fetch paginated media objects`,
      };
    }
  }

  @Patch('update/:mediaId')
  async updateMedia(
    @Body() updateMediaDto: UpateMediaDto,
    @Param('mediaId') mediaId,
  ): Promise<Object> {
    const updateMedia = await this.mediaService.updateMedia(
      mediaId,
      updateMediaDto,
    );

    if (updateMedia) {
      return {
        status: 'success',
        message: `Successfully updated status of media with the id of ${mediaId}`,
      };
    } else {
      return {
        status: 'error',
        message: `failed to update status of media with the id of ${mediaId}`,
      };
    }
  }

  @Delete('delete/:mediaId')
  softDeleteMedia(@Param('mediaId') mediaId): Object {
    const deletMedia = this.mediaService.softDeleteMedia(mediaId);
    if (deletMedia) {
      return {
        status: 'success',
        message: `Media object with the id of ${mediaId} has been deleted`,
      };
    } else {
      return {
        status: 'error',
        message: `Failed to delete media object with the id of ${mediaId}`,
      };
    }
  }
}
