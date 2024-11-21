import React from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

type TextareaInputProps = {
	name: string;
	defaultValue?: string;
	labelText?: string;
};

const tempDefaultValue =
	"Integer consequat tincidunt ex. Cras sollicitudin, justo in placerat interdum, dolor dui venenatis lacus, eu venenatis est tellus at orci. Sed dictum, lorem sit amet sodales dictum, augue dolor tempor risus, non cursus diam tortor a turpis. Vestibulum lacinia augue sit amet ipsum sagittis, a condimentum erat fermentum. Nulla imperdiet urna tellus, tristique posuere enim viverra eget. Quisque ex purus, luctus ornare dapibus eget, tincidunt nec tellus. Aliquam tristique mattis ligula, malesuada ultrices lectus elementum a. Duis quis aliquet ex. Nunc enim felis, finibus vel pellentesque nec, vulputate quis mi. Nunc molestie odio non metus bibendum laoreet. Sed ultricies tempor massa id aliquet. Pellentesque condimentum rutrum neque, et varius justo mattis eget. Mauris eu dignissim nibh. In facilisis molestie neque sit amet finibus. Aliquam erat volutpat.";

const TextareaInput = ({
	name,
	defaultValue = tempDefaultValue,
	labelText = "Description"
}: TextareaInputProps) => {
	return (
		<div className="mb-2 py-4">
			<Label htmlFor={name} className="capitalize">
				{labelText || name}
			</Label>
			<Textarea
				rows={5}
				defaultValue={defaultValue || tempDefaultValue}
				id={name}
				name={name}
				required
				className="leading-loose"
			/>
		</div>
	);
};

export default TextareaInput;
