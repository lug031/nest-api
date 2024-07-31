import { Module } from '@nestjs/common';
import { ArticulosModule } from './articulos/articulos.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ArticulosModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3307,
      username: 'articulos_crud',
      password: 'root',
      database: 'db_crud',
      //entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
