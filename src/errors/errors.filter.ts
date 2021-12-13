import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status =
      error instanceof HttpException
        ? error.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    console.error(error.name);
    console.error(error);

    if (error.name === 'TokenExpiredError') {
      return response.status(status).send({
        ...new ForbiddenException('Токен устарел'),
        debug: error.message,
      });
    }

    if (status === HttpStatus.UNAUTHORIZED) {
      return response.status(status).send({
        ...new UnauthorizedException(error.message),
      });
    }

    if (status === HttpStatus.NOT_FOUND) {
      return response
        .status(status)
        .send({ ...new NotFoundException('Не найдено'), debug: error.message });
    }

    if (error.status && error.response) {
      return response.status(error.status).send(error.response);
    }

    return response
      .status(status)
      .send({ ...new InternalServerErrorException(), debug: error.message });
  }
}
