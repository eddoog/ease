import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { UpdatePasswordUserDTO } from './update-password-user.dto';

export class ValidatePasswordDTO extends PartialType(UpdatePasswordUserDTO) {}