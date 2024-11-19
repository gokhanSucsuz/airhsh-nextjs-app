"use client";
import { useToast } from "@/hooks/use-toast";
import { actionFunction } from "../../utils/types";
import { useActionState, useEffect } from "react";

const initialState = {
	message: ""
};
const FormContainer = ({
	action,
	children
}: {
	action: actionFunction;
	children: React.ReactNode;
}) => {
	const { toast } = useToast();
	const [state, formAction] = useActionState(action, initialState);

	useEffect(
		() => {
			if (state.message) {
				toast({
					description: state.message
				});
			}
		},
		[state]
	);

	return (
		<form action={formAction}>
			{children}
		</form>
	);
};

export default FormContainer;
