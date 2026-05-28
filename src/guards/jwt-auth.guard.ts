import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/** Protects routes — requires valid Bearer JWT */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
