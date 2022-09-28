import { AxiosResponse } from "axios";
import instance from "@/utils/axios";
import { ISignUpResponse, IUser, SignUpResponse } from "../types/auth";

const responseBody = (response: AxiosResponse) => response.data;

const authRequests = {
  post: (url: string, user: IUser) =>
    instance.post<ISignUpResponse>(url, user).then(responseBody),

  getAllUsers: (url: string) => instance.get<IUser>(url).then(responseBody),
  getUser: (url: string) => instance.get<IUser>(url).then(responseBody),
};

export const authService = {
  login: (user: IUser): Promise<SignUpResponse> =>
    authRequests.post(`/login`, user),

  signup: (user: IUser): Promise<SignUpResponse> =>
    authRequests.post(`/register`, user),

  getUser: (id: number): Promise<IUser> => authRequests.getUser(`/user/${id}`),
  getAllUsers: (): Promise<IUser[]> => authRequests.getAllUsers(`/users`),
};
