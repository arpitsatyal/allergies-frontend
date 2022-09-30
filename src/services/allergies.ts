import { AxiosResponse } from "axios";

import instance from "@/utils/axios";
import { IAllergyResponse, IAllergy, IComment } from "../types/allergies";

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

  delete: (url: string) => instance.delete<void>(url).then(responseBody),

  search: (url: string, searchTerm: string) =>
    instance
      .post<IAllergyResponse>(url, { query: searchTerm })
      .then(responseBody),

  addComment: (url: string, comment: string) =>
    instance.put<IAllergyResponse>(url, { comment }).then(responseBody),

  deleteComment: (url: string, commentData: Omit<IComment, "addedBy">) =>
    instance.put<IAllergyResponse>(url, commentData).then(responseBody),
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
  deleteAllergy: (id: number): Promise<void> =>
    allergiesRequests.delete(`/allergies/${id}`),
  markAsHighRisk: (body: boolean, id: number): Promise<IAllergyResponse> =>
    allergiesRequests.markAsHighRisk(
      `/allergies/mark-as-high-risk/${id}`,
      body
    ),
  searchAllergies: (searchTerm: string): Promise<IAllergyResponse[]> =>
    allergiesRequests.search(`/allergies/search`, searchTerm),

  addComment: (comment: string, id: number): Promise<IAllergyResponse> =>
    allergiesRequests.addComment(`/allergies/add-comment/${id}`, comment),

  deleteComment: (
    commentData: Omit<IComment, "addedBy">,
    id: number
  ): Promise<IAllergyResponse> =>
    allergiesRequests.deleteComment(
      `/allergies/delete-comment/${id}`,
      commentData
    ),
};
