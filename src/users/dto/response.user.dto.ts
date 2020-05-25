import {IsNotEmpty, IsNumber, IsString} from "class-validator";
import { UserEntity } from "../model/user.entity";

export class ResponseUserDto implements Readonly<ResponseUserDto>{
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  public static from (dto: ResponseUserDto): ResponseUserDto {
    const userDto = new ResponseUserDto();
    userDto.id = dto.id;
    userDto.name = dto.name;
    return userDto;
  }

  public static fromEntity(entity: UserEntity): ResponseUserDto {
    return this.from({
      id: entity.id,
      name: entity.name
    });
  }
}
