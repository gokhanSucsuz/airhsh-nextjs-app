import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const EmptyList = ({
	heading = "No Properties Found",
	message = "Keep exploring our properties",
	btnText = "back home"
}: {
	heading?: string;
	message?: string;
	btnText?: string;
}) => {
	return <div className="mt-4" suppressHydrationWarning>
			<h2 className="text-xl font-bold">
				{heading}
			</h2>
			<p className="text-lg">
				{message}
			</p>
			<Button asChild className="mt-4 capitalize" size={"lg"}>
				<Link href={"/"}>
					{btnText}
				</Link>
			</Button>
		</div>;
};

export default EmptyList;
