import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { registrationApi } from "../../services/auth/registration";

import { useAuthContext } from "../../../context/AuthProvider";

import { ApiError, ApiResult } from "../../../interface/api";
import { IRegisteredUser, IRegistrationReq } from "../../../interface/registration";

export const useRegistration = () => {
	const { setAuth } = useAuthContext();

	return useMutation<
		ApiResult<IRegisteredUser>,
		AxiosError<ApiError>,
		{
			body: IRegistrationReq;
		}
	>({
		mutationFn: async ({ body }) => {
			const data = await registrationApi(body);

			setAuth(data.data);
			return data;
		},
	});
};
