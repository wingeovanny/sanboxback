import { Body, Controller, Get, Param, Post, Headers } from '@nestjs/common';
import { AppService } from './app.service';
import { VersionAliasRequest } from './common/alias.dto';
import { QueryIdentificationRequest } from './constants/common';
import { CurrentAlias } from './alias/alias.decorator';
import { SecondIdResponseDto } from './common/common';
import { SixCharactersPipe } from './common/pipes';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('secondid/:id')
  async getSecondIdQR(
    @Param('id', SixCharactersPipe) id: string,
    @Headers() headers?,
  ): Promise<SecondIdResponseDto> {
    const trackingId =
      headers && headers['trackingId'] ? headers['trackingId'] : 'nohub';

    try {
      return { secondId: id };
    } catch (error) {
      console.error(
        `Error | getSecondIdQR | requesting secondId with data: ${JSON.stringify(id)}`,
        trackingId,
      );
    }
  }

  @Post('/hash-identification')
  async getHashByIdentification(
    @CurrentAlias() alias: VersionAliasRequest,
    @Body() queryIdentification: QueryIdentificationRequest,
  ) {
    console.log('entro1', alias);
    const { value, trackingId } = queryIdentification;

    console.log(`QR value: ${value}`, trackingId);

    console.log(
      `Begin query hash ${alias.value} for QR ${alias.version}`,
      trackingId,
    );

    try {
      // const result = await this.aliasService.getHashByIdentification(
      //   alias.value,
      //   alias.version,
      //   trackingId,
      //   value,
      // );
      const result = {
        data: alias,
      };

      console.log(
        `Finish query hash ${alias.value} for QR ${alias.version}`,
        trackingId,
      );
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}
