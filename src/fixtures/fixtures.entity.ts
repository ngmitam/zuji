import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsInt, IsNumber, IsOptional } from 'class-validator';

@Entity()
export class FixturesEntity {
  @PrimaryGeneratedColumn()
  @ApiPropertyOptional({ description: 'id of the match' })
  @IsNumber()
  @IsOptional()
  id: number;

  // TODO: Change this to a foreign key
  @Column({ length: 500 })
  @ApiProperty({ description: 'name of the tournament' })
  @IsString()
  tournamentName: string;

  // TODO: Change this to a foreign key
  @Column({ length: 500 })
  @ApiProperty({ description: 'name of the home team' })
  @IsString()
  homeTeam: string;

  // TODO: Change this to a foreign key
  @Column({ length: 500 })
  @ApiProperty({ description: 'name of the away team' })
  @IsString()
  awayTeam: string;

  @Column('int')
  @ApiProperty({ description: 'score of the home team' })
  @IsInt()
  homeScore: number;

  @Column('int')
  @ApiProperty({ description: 'score of the away team' })
  @IsInt()
  awayScore: number;

  @Column({ type: 'int' })
  @ApiProperty({
    description: 'date of the match, in timestamp format (seconds)',
  })
  @IsNumber()
  date: number;
}
