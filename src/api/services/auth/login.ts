import { apiInstance } from "../apiInstance";

import { ILoginFormValues } from "../../../interface/login";
import { IUser } from "../../../interface/user";
import { ApiResult } from "../../../interface/api";

export const loginApi = async (body: ILoginFormValues) => {
	const { data } = await apiInstance.post<Promise<ApiResult<IUser>>>(`auth/login`, body);

	return data;
};
