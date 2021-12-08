import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.log(error);

    if (error.code === '23505') {
      return response
        .status(status)
        .send(new ConflictException('Username already exists'));
    }

    if (error.status && error.response) {
      return response.status(error.status).send(error.response);
    }

    if (status === HttpStatus.UNAUTHORIZED) {
      return response
        .status(status)
        .send(new UnauthorizedException('User is not authorised'));
    }

    if (status === HttpStatus.NOT_FOUND) {
      return response.status(status).send(new NotFoundException());
    }

    return response.status(status).send(new InternalServerErrorException());
  }
}
