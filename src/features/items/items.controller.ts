import { Router, Context } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get('/items', (context: Context) => {
  context.response.body = 'HEllo';
});

export default router;
