import { apiInstance } from "../apiInstance";

import { IRegistrationReq, IRegisteredUser } from "../../../interface/registration";
import { ApiResult } from "../../../interface/api";

export const registrationApi = async (body: IRegistrationReq) => {
	const { data } = await apiInstance.post<Promise<ApiResult<IRegisteredUser>>>(`auth/sign-up`, body);

	return data;
};
