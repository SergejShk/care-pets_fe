import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { logOutApi } from "../../services/auth/logout";

import { initialState, useAuthContext } from "../../../context/AuthProvider";

import { ApiError, ApiResult } from "../../../interface/api";

export const useLogOut = () => {
	const { setAuth } = useAuthContext();

	return useMutation<ApiResult<object>, AxiosError<ApiError>>({
		mutationFn: async () => {
			const data = await logOutApi();

			setAuth(initialState);
			return data;
		},
	});
};
