import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello/:id')
  getHello(@Param('id') id: number) {
    return this.appService.getHello(id);
  }

  @Get('break/:id')
  breakHello(@Param('id') id: number) {
    return this.appService.breakHello(id);
  }
}
