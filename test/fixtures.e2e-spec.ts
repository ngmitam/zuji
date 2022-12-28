import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('FixturesController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/fixtures/listing', () => {
    it('/fixtures/listing?timestamp=0 (GET)', () => {
      return request(app.getHttpServer())
        .get('/fixtures/listing?timestamp=0')
        .expect(200)
        .expect({
          status: 'success',
          data: [],
          metaData: {
            page: 1,
            perPage: 10,
          },
        });
    });

    it('/fixtures/listing?timestamp=1672198200 (GET)', () => {
      return request(app.getHttpServer())
        .get('/fixtures/listing?timestamp=1672198200')
        .expect(200)
        .expect({
          status: 'success',
          data: [
            {
              id: 12,
              tournamentName: 'AFF Championship',
              homeTeam: 'Vietnam',
              awayTeam: 'Malaysia',
              homeScore: 3,
              awayScore: 0,
              date: 1672144200,
            },
            {
              id: 11,
              tournamentName: 'AFF Championship',
              homeTeam: 'Laos',
              awayTeam: 'Singapore',
              homeScore: 0,
              awayScore: 2,
              date: 1672135200,
            },
            {
              id: 10,
              tournamentName: 'AFF Championship',
              homeTeam: 'Thailand',
              awayTeam: 'Philippines',
              homeScore: 4,
              awayScore: 0,
              date: 1672057800,
            },
            {
              id: 9,
              tournamentName: 'AFF Championship',
              homeTeam: 'Brunei',
              awayTeam: 'Indonesia',
              homeScore: 0,
              awayScore: 7,
              date: 1672048800,
            },
            {
              id: 8,
              tournamentName: 'AFF Championship',
              homeTeam: 'Malaysia',
              awayTeam: 'Laos',
              homeScore: 5,
              awayScore: 0,
              date: 1671885000,
            },
            {
              id: 7,
              tournamentName: 'AFF Championship',
              homeTeam: 'Singapore',
              awayTeam: 'Myanmar',
              homeScore: 3,
              awayScore: 2,
              date: 1671876000,
            },
            {
              id: 6,
              tournamentName: 'AFF Championship',
              homeTeam: 'Philippines',
              awayTeam: 'Brunei',
              homeScore: 5,
              awayScore: 1,
              date: 1671789600,
            },
            {
              id: 5,
              tournamentName: 'AFF Championship',
              homeTeam: 'Indonesia',
              awayTeam: 'Cambodia',
              homeScore: 2,
              awayScore: 1,
              date: 1671787800,
            },
            {
              id: 4,
              tournamentName: 'AFF Championship',
              homeTeam: 'Laos',
              awayTeam: 'Vietnam',
              homeScore: 0,
              awayScore: 6,
              date: 1671625800,
            },
            {
              id: 3,
              tournamentName: 'AFF Championship',
              homeTeam: 'Myanmar',
              awayTeam: 'Malaysia',
              homeScore: 0,
              awayScore: 1,
              date: 1671616800,
            },
          ],
          metaData: {
            page: 1,
            perPage: 10,
          },
        });
    });

    it('/fixtures/listing?timestamp=1672198200&page=2&per_page=4 (GET)', () => {
      return request(app.getHttpServer())
        .get('/fixtures/listing?timestamp=1672198200&page=2&per_page=4')
        .expect(200)
        .expect({
          status: 'success',
          data: [
            {
              id: 8,
              tournamentName: 'AFF Championship',
              homeTeam: 'Malaysia',
              awayTeam: 'Laos',
              homeScore: 5,
              awayScore: 0,
              date: 1671885000,
            },
            {
              id: 7,
              tournamentName: 'AFF Championship',
              homeTeam: 'Singapore',
              awayTeam: 'Myanmar',
              homeScore: 3,
              awayScore: 2,
              date: 1671876000,
            },
            {
              id: 6,
              tournamentName: 'AFF Championship',
              homeTeam: 'Philippines',
              awayTeam: 'Brunei',
              homeScore: 5,
              awayScore: 1,
              date: 1671789600,
            },
            {
              id: 5,
              tournamentName: 'AFF Championship',
              homeTeam: 'Indonesia',
              awayTeam: 'Cambodia',
              homeScore: 2,
              awayScore: 1,
              date: 1671787800,
            },
          ],
          metaData: {
            page: 2,
            perPage: 4,
          },
        });
    });
  });

  describe('/fixtures/calendar', () => {
    it('/fixtures/calendar?month=1672198200 (GET)', () => {
      return request(app.getHttpServer())
        .get('/fixtures/calendar?month=1672198200')
        .expect(200)
        .expect({
          status: 'success',
          data: [
            1671469200, 1671555600, 1671728400, 1671814800, 1671987600,
            1672074000, 1672246800, 1672333200,
          ],
        });
    });
  });
});
