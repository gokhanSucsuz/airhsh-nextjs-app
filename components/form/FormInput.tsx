import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps = {
	name: string;
	type: string;
	label?: string;
	defaultValue?: string;
	placeholder?: string;
};
const FormInput = ({
	name,
	type,
	label,
	defaultValue,
	placeholder
}: FormInputProps) => {
	return (
		<div>
			<Label htmlFor={name} className="capitalize">
				{label || name}
			</Label>
			<Input
				type={type}
				id={name}
				name={name}
				defaultValue={defaultValue}
				placeholder={placeholder || label || name}
				required
			/>
		</div>
	);
};

export default FormInput;
