export enum MessageCode {
  QR_BAD_REQUEST = 'qr_bad_request',
  QR_VALUE_INVALID = 'qr_value_invalid',
  DEFAULT = 'DEFAULT',
}

export const DETAIL_ERROR = {
  [MessageCode.QR_BAD_REQUEST]: 'The qr field does not exist',
  [MessageCode.QR_VALUE_INVALID]:
    'The value of the qr does not meet the expected conditions',
  [MessageCode.DEFAULT]: 'Provider error',
};

export class SecondIdResponseDto {
  secondId: string;
}
