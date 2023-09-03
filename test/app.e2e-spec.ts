import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  // beforeAll: Test시 새로운 애플리케이션을 생성x
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
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

    it("POST 201", () => {
      return request(app.getHttpServer())
        .post("/movies")
        .send({
          title: 'Test',
          year: 2000,
          genres: ['test'],
        })
        .expect(HttpStatus.CREATED);
    })

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe("/movies/:id", () => {
    // it.todo("GET")
    it("GET 200", () => {
      return request(app.getHttpServer())
        .get("/movies/1")
        .expect(HttpStatus.OK);
    })

    it("GET 404", () => {
      return request(app.getHttpServer())
        .get("/movies/999")
        .expect(HttpStatus.NOT_FOUND);
    })
  });
});
