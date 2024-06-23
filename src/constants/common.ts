import { registerDecorator, ValidationOptions } from 'class-validator';

export const SERVICE_NAME = 'core-alias';

export const functionalities = {
  CREATE_CORE_ALIAS: 'CREATE_CORE_ALIAS',
  GET_CORE_ALIAS: 'GET_CORE_ALIAS',
  UPDATE_CORE_ALIAS: 'UPDATE_CORE_ALIAS',
  DELETE_CORE_ALIAS: 'DELETE_CORE_ALIAS',
};
export const ALIAS_QR_CREATED = 'alias.create.alias.initiated';

export const ALAIS_QR_UPDATED = 'alias.read.alias.updated';

export enum AccountType {
  MERCHANT = 'merchant',
  PERSON = 'person',
  EXTERNAL = 'external',
}

export enum AliasTypeTransaction {
  STATIC = 'static',
  DYNAMIC = 'dynamic',
}

export enum AliasStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum AliasVersion {
  V1 = 'V1',
  V1_MIGRATED = 'V1M',
  V2 = 'V2',
  V2_PERSON = 'V2P',
  V2_MERCHANT = 'V2M',
  V2_MERCHANT_PERSON = 'V2MP',
  EXTERNAL = 'EXT',
}

export enum AliasType {
  ACCOUNT = 'account',
  CELLPHONE = 'cellphone',
  EMAIL = 'email',
}

export enum CurrencyCode {
  USD = 'USD',
}

export enum ChannelType {
  QR = 'qr',
  MAMBU = 'mambu',
  CELLPHONE = 'cellphone',
}

export enum AliasVersionValue {
  V2_PERSONA = 40,
  V2_MERCHANT = 36,
}

export const getTimeToExpire = () => {
  return Number(process.env.ALIAS_EXPIRATION_DEFAULT_TIME);
};

export function MaxExpiredTime(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'maxTransactionValue',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: number) {
          return value <= getTimeToExpire();
        },
      },
    });
  };
}

export enum UrlQRParametersType {
  AMOUNT = 'amount',
  DESCRIPTION = 'description',
}

export const BASE_QR_STATIC_URL = 'v1e_';

export const LOGO_DEUNA = 'deuna_logo_black_100.svg';

export enum OrqType {
  MC = 'MC',
  MI = 'MI',
  PY = 'PY',
}

export class QueryIdentificationRequest {
  value: string;
  trackingId: string;
  aliasVersion?: string;
  valueType?: string;
}
