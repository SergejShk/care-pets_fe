import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { loginApi } from "../../services/auth/login";

import { useAuthContext } from "../../../context/AuthProvider";

import { ApiError, ApiResult } from "../../../interface/api";
import { IUser } from "../../../interface/user";
import { ILoginFormValues } from "../../../interface/login";

export const useLogin = () => {
	const { setAuth } = useAuthContext();

	return useMutation<ApiResult<IUser>, AxiosError<ApiError>, { body: ILoginFormValues }>({
		mutationFn: async ({ body }) => {
			const data = await loginApi(body);

			setAuth(data.data);
			return data;
		},
	});
};
