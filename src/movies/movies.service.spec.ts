import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { NotFoundException } from "@nestjs/common";

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  /*
  it("test name", () => {
    expect something
  })
  */

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getAll", () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array); // return 타입이 배열인가?
    })
  })

  describe("getOne", () => {
    // test를 위한 더미데이터 생성
    it('should return a movie', () => {
      service.create({
        title: "Test Movie",
        genres: ['test'],
        year: 2000,
      });

      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      // expect(movie.id).toEqual(1);
      // expect(movie.title).toEqual("Test Movie");
    });

    // 에러 test
    it("should throw 404 error", () => {
      try{
        service.getOne(999);
      }catch(e){
        expect(e).toBeInstanceOf(NotFoundException);
        // expect(e.message).toEqual(`Movie with ID: 999 not found`)
      }
    })
  });
});
