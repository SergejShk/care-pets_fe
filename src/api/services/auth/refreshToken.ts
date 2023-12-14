import { apiInstance } from "../apiInstance";

export const refreshApi = async () => {
	return await apiInstance.get(`auth/refresh`);
};
