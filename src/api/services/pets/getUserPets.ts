import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../../interface/api";
import { IPetApi } from "../../../interface/pets";

export const getUserPetsApi = async () => {
	const { data } = await apiInstance.post<Promise<ApiResult<IPetApi[]>>>(`pets/user-pets`);

	return data;
};
