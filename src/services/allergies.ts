import { AxiosResponse } from "axios";
import instance from "@/utils/axios";
import { IAllergyResponse, IAllergy } from "../types/allergies";

const responseBody = (response: AxiosResponse) => response.data;

const allergiesRequests = {
  get: (url: string) => instance.get<IAllergyResponse>(url).then(responseBody),

  post: (url: string, body: IAllergy) =>
    instance.post<IAllergyResponse>(url, body).then(responseBody),

  put: (url: string, body: IAllergy) =>
    instance.put<IAllergyResponse>(url, body).then(responseBody),

  markAsHighRisk: (url: string, body: boolean) =>
    instance
      .put<IAllergyResponse>(url, {
        highRisk: body,
      })
      .then(responseBody),

  delete: (url: string) => instance.delete<any>(url).then(responseBody),
};

export const allergiesService = {
  getAllergies: (page = 1, pageSize = 1): Promise<IAllergyResponse[]> => {
    return allergiesRequests.get(
      `/allergies?page=${page}&pagesize=${pageSize}`
    );
  },
  getAllergy: (id: number): Promise<IAllergyResponse> =>
    allergiesRequests.get(`/allergies/${id}`),
  addAllergy: (allergy: IAllergy): Promise<IAllergyResponse> =>
    allergiesRequests.post(`/allergies`, allergy),
  updateAllergy: (allergy: IAllergy, id: number): Promise<IAllergyResponse> =>
    allergiesRequests.put(`/allergies/${id}`, allergy),
  deleteAllergy: (id: number): Promise<any> =>
    allergiesRequests.delete(`/allergies/${id}`),
  markAsHighRisk: (body: boolean, id: number): Promise<any> =>
    allergiesRequests.markAsHighRisk(
      `/allergies/mark-as-high-risk/${id}`,
      body
    ),
};
