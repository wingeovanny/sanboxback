import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class SixCharactersPipe implements PipeTransform {
  transform(value: string) {
    if (value.length !== 6) {
      throw new BadRequestException('Code Number must be a 6-character');
    }
    return value;
  }
}
