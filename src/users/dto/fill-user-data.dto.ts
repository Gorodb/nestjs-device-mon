import { IsNotEmptyObject, IsObject, IsOptional, IsString, IsUUID, Length, Matches } from 'class-validator';
import { Departments } from '../../departments/departments.entity';
import { FileElementResponseDto } from '../../files/dto/file-element-response.dto';
import { createUserMessages } from './userMessages';

export class FillUserDataDto {
  @IsOptional()
  @IsString({ message: createUserMessages.en.description })
  description?: string;

  @IsOptional()
  @IsString()
  @Length(6, 15, { message: createUserMessages.en.phone })
  phone?: string;

  @IsOptional()
  @IsString({ message: createUserMessages.en.name })
  name?: string;

  @IsUUID('all', { message: createUserMessages.en.department })
  @IsString({ message: createUserMessages.en.department })
  department: Departments;

  @IsOptional()
  @IsString({ message: createUserMessages.en.location })
  location?: string;

  @IsOptional()
  @IsNotEmptyObject(
    { nullable: true },
    { message: createUserMessages.en.logo },
  )
  @IsObject({ message: createUserMessages.en.logo })
  logo?: FileElementResponseDto;

  @IsString()
  @Matches(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, {
    message: createUserMessages.en.email,
  })
  email: string;
}
