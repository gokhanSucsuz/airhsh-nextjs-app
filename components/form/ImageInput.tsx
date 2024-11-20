import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const ImageInput = () => {
	const name = "image";
	return (
		<div className="mb-2">
			<Label htmlFor={name} className="capitalize">
				Profile Image
			</Label>
			<Input
				type="file"
				id={name}
				name={name}
				required
				accept="image/*"
				className="max-w-xs"
			/>
		</div>
	);
};

export default ImageInput;
