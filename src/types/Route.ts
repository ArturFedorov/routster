import {HttpMethod} from './HttpMethod.ts';

export interface Route {
  method: HttpMethod;
  route: string;
  handler: (...params: any) => Promise<any>;
}
