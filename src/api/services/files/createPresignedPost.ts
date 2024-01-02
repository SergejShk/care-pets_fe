import { apiInstance } from "../apiInstance";

import { ApiResult } from "../../../interface/api";
import { FolderType, ICreatePresignedPostReq, ICreatePresignedPostRes } from "../../../interface/files";

export const createPresignedPostApi = async (
	body: ICreatePresignedPostReq,
	folder: FolderType
): Promise<ApiResult<ICreatePresignedPostRes>> => {
	const { data } = await apiInstance.post<Promise<ApiResult<ICreatePresignedPostRes>>>(
		`files/presigned-link/${folder}`,
		body
	);

	return data;
};
