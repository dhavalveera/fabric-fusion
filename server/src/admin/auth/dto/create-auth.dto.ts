export class CreateAdminAuthDto {
  name: string;
  email: string;
  password: string;
}

export class SignInAdminAuthDto {
  email: string;
  password: string;
}

export class AccessToken {
  access_token: string;
}
