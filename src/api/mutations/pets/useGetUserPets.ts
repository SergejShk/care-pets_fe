import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { getUserPetsApi } from "../../services/pets/getUserPets";

import { ApiError, ApiResult } from "../../../interface/api";
import { IPetApi } from "../../../interface/pets";

export const useGetUserPets = () => {
	return useMutation<ApiResult<IPetApi[]>, AxiosError<ApiError>>({
		mutationFn: async () => {
			const data = await getUserPetsApi();

			return data;
		},
	});
};
