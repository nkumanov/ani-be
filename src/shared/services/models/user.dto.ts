export interface IUserCreateDto {
  username: string;
  password: string;
  confirmPassword: string;
}

export interface IUserSignInDto {
  username:string;
  password: string;
}
