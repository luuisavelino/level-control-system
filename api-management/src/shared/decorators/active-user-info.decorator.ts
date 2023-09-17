import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserInfo = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const { userUuid, role } = request;

    if (!userUuid || !role) {
      throw new UnauthorizedException();
    }

    return {
      userUuid,
      role,
    };
  },
);
