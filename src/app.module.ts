import { Module } from '@nestjs/common';
import { ArticulosModule } from './articulos/articulos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import environments  from '../utils/environments';

if (!environments.DATABASE_URL || !environments.DATABASE_USER || !environments.DATABASE_PASSWORD) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const dbUrlObj = new URL(environments.DATABASE_URL);

const host = dbUrlObj. hostname;
const database = dbUrlObj.pathname.substring(1);

@Module({
  imports: [
    ArticulosModule,
    TypeOrmModule.forRoot({
      type: 'postgres',//mysql
      host: host,
      username: environments.DATABASE_USER,
      password: environments.DATABASE_PASSWORD,
      database: database,
      //entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
