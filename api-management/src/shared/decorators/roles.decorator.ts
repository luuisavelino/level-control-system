import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'ROLES';
export const ADMIN = 'ADMIN';
export const ENGINEER = 'ENGINEER';
export const USER = 'USER';

export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
