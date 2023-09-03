import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication(); 
    // transform 적용
    app.useGlobalPipes(new ValidationPipe({
      whitelist : true, // 데코레이터가 없는 속성은 제거되어 저장됨.
      forbidNonWhitelisted: true, //기본적으로 필요하지 않는 필드는 무시하지만 클라이언트에게 경고를 반환
      transform: true,
    }));
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
          genres: ['test']
        })
        .expect(HttpStatus.CREATED);
    })

    it("DELETE", () => {
      return request(app.getHttpServer())
        .delete("/movies")
        .expect(HttpStatus.NOT_FOUND);
    })

    describe("/movies/:id", () => {
      // it.todo("GET")
      it("GET 200", () => {
        return request(app.getHttpServer())
          .get("/movies/1")
          .expect(HttpStatus.NOT_FOUND);
      })
      it.todo("POST")
      it.todo("DELETE")
    })
  });
});
