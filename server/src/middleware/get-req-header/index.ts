import { IncomingMessage } from "http";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const Header = createParamDecorator((name: string, ctx: ExecutionContext): string | undefined => {
  const req = ctx.switchToHttp().getRequest<IncomingMessage>();
  const { headers } = req;

  return headers[name] as string;
});
