import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import { createPetApi } from "../../services/pets/createPet";

import { ApiError, ApiResult } from "../../../interface/api";
import { IPetApi } from "../../../interface/pets";

export const useCreatePet = () => {
	return useMutation<ApiResult<IPetApi>, AxiosError<ApiError>, { body: IPetApi }>({
		mutationFn: async ({ body }) => {
			const data = await createPetApi(body);

			return data;
		},
	});
};
