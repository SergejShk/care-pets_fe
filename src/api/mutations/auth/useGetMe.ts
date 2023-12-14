import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { getMeApi } from "../../services/auth/getMe";

import { useAuthContext } from "../../../context/AuthProvider";

import { ApiError, ApiResult } from "../../../interface/api";
import { IUser } from "../../../interface/user";

export const useGetMe = () => {
	const { setAuth } = useAuthContext();

	return useMutation<ApiResult<IUser>, AxiosError<ApiError>>({
		mutationFn: async () => {
			const data = await getMeApi();

			const user = data.data as unknown as IUser;

			setAuth(user);
			return data;
		},
	});
};
