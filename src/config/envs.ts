import * as joi from 'joi';
import 'dotenv/config';

interface IEnvVars {
  PORT: number;
}

const envSchema = joi.object({ PORT: joi.number().required() }).unknown(true);
console.log(process.env);
const { error, value } = envSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: IEnvVars = value;

export const envs = {
  port: envVars.PORT,
};
