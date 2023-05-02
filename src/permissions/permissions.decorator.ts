import { SetMetadata } from '@nestjs/common';

export const Permissions = (parmissions: string[]) =>
    SetMetadata('permissions', parmissions);
