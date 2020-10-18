import { serve, ServerRequest } from 'https://deno.land/std@0.74.0/http/mod.ts';
import { Status } from 'https://deno.land/std@0.74.0/http/http_status.ts';
import {Route} from './src/types/Route.ts';
import {RouteParam} from './src/types/RouteParam.ts';
import {HttpMethod} from './src/types/HttpMethod.ts';
import {extractRouteParams, routeParamPattern} from './src/services/Extractor.ts';

const s = serve({ port: 8000 });

console.log(`server running on port 8000`);

const routes: Route[] = [
  {
    method: HttpMethod.GET,
    route: '/api/user',
    handler: () => Promise.resolve('helll0')
  },
  {
    method: HttpMethod.GET,
    route: '/api/user/:id',
    handler: (id) => Promise.resolve('user' + id),
  },
  {
    method: HttpMethod.GET,
    route: '/api/user/:id/:hello',
    handler: (id, hello) => Promise.resolve('user' + id + hello),
  }
];

/**
 * Basic route matcher. Check to see if the method and url match the route
 * @param req the received request
 * @param route the route being checked against
 */
export const basicRouteMatcher = (req: ServerRequest, route: Route): boolean =>
  req.method === route.method && req.url === route.route;

/**
 * Attempt to match the route if it has route params. For instance /api/user/12 to match with /api/user/:id.
 * @param req the received HTTP request
 * @param route the route being checked against
 */
export const routeWithParamsRouteMatcher = (req: ServerRequest, route: Route): boolean => {
  const routeMatcherRegEx = new RegExp(`^${routeParamPattern(route.route)}$`);
  return req.method === route.method && route.route.includes('/:') && routeMatcherRegEx.test(req.url);
};

/**
 * Match the received request to a route in the routing table. return the handler function for that route
 * @param routes the routing table for the API
 * @param req the received request
 */
export const matchRequestToRouteHandler = async (routes: Route[], req: ServerRequest): Promise<void> => {
  let route: Route | undefined = routes.find((route: Route) => basicRouteMatcher(req, route));
  if (route) {
    const response: any = await route.handler();
    return req.respond({ status: Status.OK, body: JSON.stringify(response) });
  }
  route = routes.find((route: Route) => routeWithParamsRouteMatcher(req, route));
  if (route) {
    // the received route has route params, extract the route params from the route
    const routeParamsMap: RouteParam[] = extractRouteParams(route.route);
    const routeSegments: string[] = req.url.split('/');
    const routeParams: { [key: string]: string | number } = routeParamsMap.reduce(
      (accum: { [key: string]: string | number }, curr: RouteParam) => {
        return {
          ...accum,
          [curr.paramKey]: routeSegments[curr.idx],
        };
      },
      {}
    );
    const response: any = await route.handler(...Object.values(routeParams));
    return req.respond({ status: Status.OK, body: JSON.stringify(response) });
  }
  // route could not be found, return 404
  return req.respond({ status: Status.NotFound, body: 'Route not found' });
};

for await (const req: ServerRequest of s) {
  matchRequestToRouteHandler(routes, req);
}
