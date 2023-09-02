import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe("/movies", () => {

    it("GET", () => {
      return request(app.getHttpServer()) // localhost:3000 생략
        .get("/movies")
        .expect(200)
        .expect([]); // 빈 배열 반환
    })

    it("POST", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: 'Test',
          year: 2021,
          geners: ['test']
        })
        .expect(HttpStatus.CREATED);
    })

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(HttpStatus.NOT_FOUND);
    })


  });
  

});
