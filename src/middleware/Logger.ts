import { LoggerService } from '@nestjs/common';

export class MyLogger implements LoggerService {
  log(message: string) {
    /* your implementation */
    console.log(message)
  }
  error(message: string, trace: string) {
    /* your implementation */
    console.log(message,trace)

  }
  warn(message: string) {
    /* your implementation */
    console.log(message)

  }
  debug(message: string) {
    /* your implementation */
    console.log(message)

  }
  verbose(message: string) {
    /* your implementation */
    console.log(message)

  }
}