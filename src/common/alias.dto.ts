export class VersionAliasRequest {
  value: string;
  version: AliasVersion;
}
export enum AliasVersion {
  V1 = 'V1',
  V1_MIGRATED = 'V1M',
  V2 = 'V2',
  V2_PERSON = 'V2P',
  V2_MERCHANT = 'V2M',
  V2_MERCHANT_PERSON = 'V2MP',
  EXTERNAL = 'EXT',
  V2_NUMERIC_CODE_MERCHANT = 'V2NCM',
}
