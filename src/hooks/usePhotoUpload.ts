import { useState } from "react";

import { createPresignedPostApi } from "../api/services/files/createPresignedPost";

import { FolderType } from "../interface/files";
import { IPhoto } from "../interface/common";

export const usePhotoUpload = () => {
	const [uploadedPhoto, setUploadedPhoto] = useState<IPhoto | undefined>(undefined);

	const handlePhotoUpload = async (file: File, folderType: FolderType) => {
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
				setUploadedPhoto({
					originalKey: response.data.fields.key,
					key: file.name,
				});
			})
			.catch((e) => console.log(e));
	};

	return { uploadedPhoto, handlePhotoUpload };
};
