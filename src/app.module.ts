import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/Media';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MediaController } from './media/media.controller.js';
import { MediaService } from './media/media.service.js';
 
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'stereo_media',
      entities: [Media],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Media]),
  ],
  controllers: [AppController, MediaController],
  providers: [AppService, MediaService],
})
export class AppModule {}
