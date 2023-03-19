import { DataSource } from 'typeorm';
import { Media } from '../entities/Media';
import { initialMediaSchema1679222587192 } from '../migrations/1679222587192-initial-media-schema';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'stereo_media',
  entities: [Media],
  migrations: [initialMediaSchema1679222587192],
});
