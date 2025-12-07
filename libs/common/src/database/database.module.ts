import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MY_SQL_HOST'),
        port: configService.getOrThrow('MY_SQL_PORT'),
        database: configService.getOrThrow('MY_SQL_DATABASE'),
        username: configService.getOrThrow('MY_SQL_USERNAME'),
        password: configService.getOrThrow('MY_SQL_PASSWORD'),
        synchronize: configService.getOrThrow('MY_SQL_SYNCHRONIZE'),
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(models: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(models);
  }
}
