import { Router, Context } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

router.get('/items2', (context: Context) => {
  context.response.body = 'HEllo2';
});

export default router;
