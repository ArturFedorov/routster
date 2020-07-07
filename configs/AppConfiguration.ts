import { config } from 'https://deno.land/x/dotenv/mod.ts';

const env = config();

export class AppConfiguration {
  static general = {
    projectName: env.DENO_PROJECT_NAME || 'deno-seed'
  };

  static server = {
    env:  env.DENO_ENV || 'development',
    port: Number(env.DENO_PORT) || 3000
  }
}
