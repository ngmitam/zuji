import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { FixturesModule } from './fixtures/fixtures.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: !Boolean(process.env.IS_PRODUCTION),
      legacySpatialSupport: false, // FIXME: Will fix this later
    }),
    FixturesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
