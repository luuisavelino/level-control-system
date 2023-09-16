import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserInfo = createParamDecorator<undefined>(
  (data, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const { userUuid, roleId } = request;

    if (!userUuid || !roleId) {
      throw new UnauthorizedException();
    }

    return {
      userUuid,
      roleId,
    };
  },
);
