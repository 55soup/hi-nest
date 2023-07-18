import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // controller: url를 가져옴, function 실행
  // business service: 실제로 function을 가짐.
  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }
}
