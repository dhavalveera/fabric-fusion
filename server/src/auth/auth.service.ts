import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signIn(): string {
    return 'Sign In URL';
  }
}
