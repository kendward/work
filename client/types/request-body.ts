export interface ISignUpBody {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ISignInBody {
  email: string;
  password: string;
}

export interface IVerifyAccountBody {
  token: string;
}
export interface IForgotPasswordBody {
  email: string;
}

export interface IVerifyEmailBody {
  email: string;
}

export interface IResetPasswordBody {
  password: string;
  token: string;
  confirmPassword: string;
}
