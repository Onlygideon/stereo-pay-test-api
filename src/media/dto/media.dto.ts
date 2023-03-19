import {IsString, IsNotEmpty} from "class-validator"

export class UpateMediaDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}