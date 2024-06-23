import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { has } from 'lodash';

import { error } from 'console';
import { AliasVersion } from 'src/common/alias.dto';
import { getValueQR, getVersionQR } from 'src/utils/commons';

const qrLengthMin = process.env.QR_VALUE_MINIMUM_LENGTH || 6;
const qrLengthMax = process.env.QR_VALUE_MAXIMUM_LENGTH || 60;
const pattern = /^(v1e_)?[a-zA-Z0-9+=/]+$/;

export const userExtractor = (_: unknown, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest();
  if (!has(request, 'body.value')) throw new BadRequestException('Errorrrr');

  if (
    has(request, 'body.aliasVersion') &&
    request.body.aliasVersion === AliasVersion.V2
  )
    return {
      value: request.body.value,
      version: AliasVersion.V2,
    };

  const value = request.body.value;
  const valueQR = getValueQR(value);
  const versionQR = getVersionQR(value);

  if (
    !pattern.test(valueQR) ||
    valueQR?.length < +qrLengthMin ||
    valueQR?.length > +qrLengthMax
  )
    throw new error(error);

  return {
    value: valueQR,
    version: versionQR,
  };
};

export const CurrentAlias = createParamDecorator(userExtractor);
