import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HandledError } from '../handledError/HandledError';
import { FixturesService } from './fixtures.service';

@Controller('fixtures')
@ApiTags('fixtures')
export class FixturesController {
  constructor(private readonly fixturesService: FixturesService) {}

  @ApiOperation({ summary: 'Get fixtures listing' })
  @Get('/listing')
  @ApiQuery({
    name: 'timestamp',
    required: true,
    description:
      'Time in timestamp format (seconds), when fixtures were fetched',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({
    name: 'per_page',
    required: false,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description: 'The fixtures listing',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              tournamentName: { type: 'string' },
              homeTeam: { type: 'string' },
              awayTeam: { type: 'string' },
              homeScore: { type: 'number' },
              awayScore: { type: 'number' },
              date: { type: 'number' },
            },
          },
        },
        metaData: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            perPage: { type: 'number' },
          },
        },
        error: { type: 'string' },
      },
    },
  })
  async getListing(
    @Query('timestamp') timestamp: string,
    @Query('page') page?: string,
    @Query('per_page') perPage?: string,
  ) {
    try {
      const response = await this.fixturesService.getListing(
        timestamp,
        page,
        perPage,
      );
      return {
        status: 'success',
        ...response,
      };
    } catch (error) {
      if (error instanceof HandledError) {
        return {
          status: 'error',
          error: error.message,
        };
      }
      throw new HttpException(
        'Something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // TODO: Handle timezones
  @ApiOperation({ summary: 'Get fixtures calendar' })
  @Get('/calendar')
  @ApiQuery({
    name: 'month',
    required: true,
    description:
      'Month in timestamp format (seconds), the month to fetch fixtures for',
  })
  @ApiResponse({
    status: 200,
    description: 'The fixtures calendar',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'number',
            description: 'Timestamp of the day',
          },
        },
        error: { type: 'string' },
      },
    },
  })
  async getCalendar(@Query('month') month: string) {
    try {
      const response = await this.fixturesService.getCalendar(month);
      return {
        status: 'success',
        ...response,
      };
    } catch (error) {
      if (error instanceof HandledError) {
        return {
          status: 'error',
          error: error.message,
        };
      }
      throw new HttpException(
        'Something went wrong!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
