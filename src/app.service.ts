import { ImATeapotException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  promisesRejects: Record<string, (message: string) => void> = {};

  pause(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getHello(id: number) {
    try {
      let promiseReject: (message: string) => void;

      const resultPromise = new Promise(async (resolve, reject) => {
        promiseReject = reject;
        await this.pause(30000);
        resolve('Hello, World!');
      }).catch((e) => {
        throw new Error(e);
      });

      this.promisesRejects[id] = promiseReject;
      console.log(this.promisesRejects);

      return await resultPromise;
    } catch (e) {
      throw new ImATeapotException(e.message);
    }
  }

  async breakHello(id: number) {
    if (this.promisesRejects[id]) {
      this.promisesRejects[id]('stop');
      return 'stopped';
    }
    return 'job not found';
  }
}
