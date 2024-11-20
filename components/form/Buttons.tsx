"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { RxReload } from "react-icons/rx";

type btnSize = "default" | "sm" | "lg";
type SubmitButtonProps = {
	className?: string;
	text?: string;
	size?: btnSize;
};
const SubmitButton = ({ className, text = "Submit", size="lg" }: SubmitButtonProps) => {
	const { pending } = useFormStatus();
	return (
		<Button
			type="submit"
			className={`capitalize ${className}`}
			disabled={pending}
			size={size}
		>
            {pending ? <>
                <RxReload className="w-4 h-4 mr-2 animate-spin" />
                Please Wait...
            </> : text}
		</Button>
	);
};

export default SubmitButton;
