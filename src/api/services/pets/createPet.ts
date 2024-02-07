import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../../interface/api";
import { IPetApi } from "../../../interface/pets";

export const createPetApi = async (body: IPetApi) => {
	const { data } = await apiInstance.post<Promise<ApiResult<IPetApi>>>(`pets/new`, body);

	return data;
};
