import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixturesController } from './fixtures.controller';
import { FixturesEntity } from './fixtures.entity';
import { FixturesService } from './fixtures.service';

@Module({
  imports: [TypeOrmModule.forFeature([FixturesEntity])],
  controllers: [FixturesController],
  providers: [FixturesService],
})
export class FixturesModule {}
