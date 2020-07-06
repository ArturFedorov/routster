import { IAppConfiguration } from '../shared/interfaces/config/IAppConfiguration.ts';
import { config } from 'https://deno.land/x/dotenv/mod.ts';

const env = config();

const AppConfiguration: IAppConfiguration = {
  general: {
    projectName: env.DENO_PROJECT_NAME || 'deno-seed'
  },
  server: {
    env:  env.DENO_ENV || 'development',
    port: Number(env.DENO_PORT) || 3000
  }
}

export default AppConfiguration;
