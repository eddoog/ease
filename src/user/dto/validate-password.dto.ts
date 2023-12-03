import { PartialType } from '@nestjs/swagger';
import { UpdatePasswordUserDTO } from './update-password-user.dto';

export class ValidatePasswordDTO extends PartialType(UpdatePasswordUserDTO) {}
