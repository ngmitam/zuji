import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { isNumber } from 'class-validator';
import { HandledError } from '../handledError/HandledError';
import { Repository } from 'typeorm';
import { FixturesEntity } from './fixtures.entity';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(FixturesEntity)
    private readonly fixturesRepository: Repository<FixturesEntity>,
  ) {}

  /**
   * This method returns a promise with fixtures listing data and metadata for given timestamp
   * @param timestamp string - timestamp in seconds
   * @param page string - page number
   * @param perPage string - number of items per page
   * @returns Promise<{data: FixturesEntity[]; metaData: {page: number; perPage: number;};}>
   * @throws HandledError
   */
  async getListing(
    timestamp: string,
    page: string | undefined,
    perPage: string | undefined,
  ): Promise<{
    data: FixturesEntity[];
    metaData: {
      page: number;
      perPage: number;
    };
  }> {
    if (!timestamp) {
      throw new HandledError('timestamp is required');
    }

    if (!isNumber(parseInt(timestamp))) {
      throw new HandledError('timestamp must be a number');
    }

    if (parseInt(timestamp) < 0) {
      throw new HandledError('timestamp must be a positive number');
    }

    if (page && !isNumber(parseInt(page))) {
      throw new HandledError('Page must be a number');
    }

    if (page && parseInt(page) < 1) {
      throw new HandledError('Page must be a positive number');
    }

    if (perPage && !isNumber(parseInt(perPage))) {
      throw new HandledError('Per page must be a number');
    }

    if (perPage && parseInt(perPage) < 1) {
      throw new HandledError('Per page must be a positive number');
    }

    const pageInt = page ? parseInt(page) : 1;
    const perPageInt = perPage ? parseInt(perPage) : 10;

    const queryBuilder = this.fixturesRepository
      .createQueryBuilder('fixtures')
      .where('fixtures.date <= :date', { date: timestamp })
      .orderBy('fixtures.date', 'DESC')
      .skip((pageInt - 1) * perPageInt)
      .take(perPageInt);

    const data = await queryBuilder.getMany();

    return {
      data,
      metaData: {
        page: pageInt,
        perPage: perPageInt,
      },
    };
  }

  // TODO: handle timezones
  /**
   * This method returns a promise with fixtures calendar data for a given month
   * @param month string - month in timestamp format (seconds)
   * @returns Promise<{data: number[];}>
   * @throws HandledError
   */
  async getCalendar(month: string): Promise<{
    data: number[];
  }> {
    if (!month) {
      throw new HandledError('month is required');
    }

    if (!isNumber(parseInt(month))) {
      throw new HandledError('month must be a number');
    }

    // get the first day of the month
    const queryMonth = new Date(parseInt(month) * 1000);

    const queryMonthDate = new Date(
      queryMonth.getFullYear(),
      queryMonth.getMonth(),
      1,
    );

    const queryMonthTimestamp = queryMonthDate.getTime() / 1000;

    // get the first day of the next month
    let nextMonth = queryMonth.getMonth() + 1;
    let nextMonthYear = queryMonth.getFullYear();

    if (nextMonth > 11) {
      nextMonth = 0;
      nextMonthYear += 1;
    }

    const nextMonthDate = new Date(nextMonthYear, nextMonth, 1);
    const nextMonthTimestamp = nextMonthDate.getTime() / 1000;

    // get the fixtures for the month (where date >= queryMonthTimestamp and date < nextMonthTimestamp)
    // and return the dates in timestamp format

    const queryBuilder = this.fixturesRepository
      .createQueryBuilder('fixtures')
      .where('fixtures.date >= :date', { date: queryMonthTimestamp })
      .andWhere('fixtures.date < :next_date', {
        next_date: nextMonthTimestamp,
      });

    const rawData = await queryBuilder.getMany();

    let data = rawData.map((fixture) => fixture.date);

    data = data.map((date) => {
      const dateObj = new Date(date * 1000);
      // set the time to 00:00:00
      dateObj.setHours(0, 0, 0, 0);
      return dateObj.getTime() / 1000;
    });

    data = [...new Set(data)];

    data.sort((a, b) => a - b);

    return {
      data,
    };
  }
}
