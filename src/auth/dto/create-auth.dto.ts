import { IsEmail, IsString } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  email: string;  // ← must be string, not a function

  @IsString()
  password: string;
}