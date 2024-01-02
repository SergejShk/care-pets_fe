import { useGetMe } from "../api/mutations/auth/useGetMe";

import { createPresignedPostApi } from "../api/services/files/createPresignedPost";
import { updateProfileApi } from "../api/services/profile/updateProfile";

import { FolderType } from "../interface/files";

export const usePhotoUpload = () => {
	const { mutate: updateCurrentUser } = useGetMe();

	const handlePhotoUpload = async (file: File, folderType: FolderType, userId: number) => {
		const response = await createPresignedPostApi(
			{
				key: file.name,
				type: file.type,
			},
			folderType
		);

		const presignedLink = response.data.url;
		const fields = response.data.fields;

		const formData = new FormData();
		Object.entries(fields).forEach(([k, v]) => {
			formData.append(k, v);
		});
		formData.append("file", file);

		fetch(presignedLink, {
			method: "POST",
			body: formData,
		})
			.then(async () => {
				await updateProfileApi({
					id: userId,
					photo: {
						originalKey: response.data.fields.key,
						key: file.name,
					},
				});

				updateCurrentUser();
			})
			.catch((e) => console.log(e));
	};

	return { handlePhotoUpload };
};
