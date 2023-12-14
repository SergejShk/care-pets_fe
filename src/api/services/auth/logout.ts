import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../../interface/api";

export const logOutApi = async () => {
	const { data } = await apiInstance.get<Promise<ApiResult<object>>>(`auth/logout`);

	return data;
};
