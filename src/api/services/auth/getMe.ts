import { AxiosError } from "axios";

import { apiInstance } from "../apiInstance";

import { refreshApi } from "./refreshToken";

import { ApiError, ApiResult } from "../../../interface/api";
import { IUser } from "../../../interface/user";

export const getMeApi = async (): Promise<ApiResult<IUser>> => {
	try {
		const { data } = await apiInstance.get<Promise<ApiResult<IUser>>>(`auth/me`);

		return data;
	} catch (err) {
		const error: AxiosError<ApiError, unknown> = err as AxiosError<"string", unknown>;

		if (!error.response) {
			throw err;
		}

		if (error.response?.status === 401) {
			try {
				await refreshApi();

				return await getMeApi();
			} catch (error) {
				throw err;
			}
		}

		throw error;
	}
};
