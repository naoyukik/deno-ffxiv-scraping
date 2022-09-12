import { HandlerContext } from "$fresh/server.ts";
import { fetchRetainerListAction } from '../../Modules/Controller/RetainersController.ts'

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const body = fetchRetainerListAction(_req, _ctx, true);
  return new Response(body);
};
