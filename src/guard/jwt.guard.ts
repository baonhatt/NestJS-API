import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()

export default class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}

