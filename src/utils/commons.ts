import { get, isEmpty } from 'lodash';
import { isBase64 } from 'class-validator';
import { AliasVersion } from 'src/common/alias.dto';
import { BadRequestException } from '@nestjs/common';
import { error } from 'console';
import { AliasVersionValue } from 'src/constants/common';

export const transformCapitalize = (str: string): string => {
  const aStr: string[] = str.split(' ');
  const wordCapitalize = aStr.reduce(function (acc, current): string {
    return (
      acc +
      current.charAt(0).toUpperCase() +
      current.slice(1).toLowerCase() +
      ' '
    );
  }, '');
  return wordCapitalize.trimEnd();
};

export const getVersionQR = (value: string): AliasVersion => {
  if (isBase64(value.replace(/[\r\n]/gm, ''))) {
    return AliasVersion.V1;
  }

  const qrUrlParams = getURLParams(value);

  if (!qrUrlParams) {
    throw new BadRequestException('errrrr');
  }

  const id = qrUrlParams.get('id');
  if (id && id.includes('v1e_')) {
    return AliasVersion.EXTERNAL;
  }

  if (!!qrUrlParams.get('token')) {
    return AliasVersion.V1;
  }

  if (!!qrUrlParams.get('id') && qrUrlParams.get('id').length == 6) {
    return AliasVersion.V2_NUMERIC_CODE_MERCHANT;
  }

  if (!!qrUrlParams.get('id')) {
    return AliasVersion.V2;
  }

  throw new error('ero');
};

export const getValueQR = (value: string): string => {
  const valueParsed = value.replace(/[\r\n]/gm, '');
  if (isBase64(valueParsed)) {
    try {
      const decode = JSON.parse(Buffer.from(valueParsed, 'base64').toString());

      const token = get(decode, 'token');

      if (isEmpty(token)) throw error('InvalidQRException1');

      return token;
    } catch (e) {
      throw new error('InvalidQRException2');
    }
  }

  const qrUrlParams = getURLParams(value);

  if (!qrUrlParams) {
    throw new error('InvalidQRException3');
  }

  const tokenParam = qrUrlParams.get('token');

  if (!!tokenParam) {
    return tokenParam;
  }
  const idParam = qrUrlParams.get('id');
  if (!!idParam) {
    return idParam;
  }

  if (value.length === AliasVersionValue.V2_PERSONA) {
    return value;
  }

  throw error('InvalidQRException4');
};

const getURLParams = (value: string) => {
  try {
    const url = new URL(value);
    console.log('url:', url);
    return url.searchParams;
  } catch (e) {
    throw error('InvalidQRException2');
  }
};

export const calculateMinutsOffset = (minutsToExpired: number): Date => {
  minutsToExpired = minutsToExpired ?? getTimeToExpire();

  const hoursOffset = 60 * 1000 * minutsToExpired;

  return new Date(new Date().getTime() + hoursOffset);
};

export const getTimeToExpire = () => {
  return parseInt(process.env.ALIAS_EXPIRATION_DEFAULT_TIME, 10);
};

export const getAliasNanoIdLength = () => {
  return parseInt(process.env.NANOID_LENGTH, 10);
};

export const getAliasStaticNanoIdLength = () => {
  return parseInt(process.env.ALIAS_STATIC_NANOID_LENGTH, 10);
};

export const tempDateIgnore = '2023-06-09  06:00:30.746'; /// date to eval a soft delete and not affect old qrs this dates is going to be delete after a modification in db

export const formatPhoneNumber = (value: string): string => {
  return `593${value.slice(-9)}`;
};

export const getParametersFromQrString = (
  value: string,
): Map<string, string> => {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  if (urlRegex.test(value)) {
    const url = new URLSearchParams(value);
    const parameters = new Map<string, string>();
    url.forEach((value, key) => {
      parameters.set(key, value);
    });

    return parameters;
  }
  return undefined;
};
