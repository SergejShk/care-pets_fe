import { apiInstance } from "../apiInstance";

import { IUpdateUser, IUser } from "../../../interface/user";
import { ApiResult } from "../../../interface/api";

export const updateProfileApi = async (body: IUpdateUser) => {
	const { id, ...payload } = body;
	const { data } = await apiInstance.put<Promise<ApiResult<IUser>>>(`users/update/${id}`, payload);

	return data;
};
