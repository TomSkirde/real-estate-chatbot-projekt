import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [TypeORMModule.forRoot({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('DATABASE_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
