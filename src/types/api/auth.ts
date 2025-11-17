export type loginRequestBody = {
  email: string;
  password: string;
};

export type loginSuccessResponse = {
  accessToken: string;
};

export type loginFailResponse = {
  message: string;
};
