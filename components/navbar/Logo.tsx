import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
	return (
		<Button asChild variant="ghost" size="logo">
			<Link href="/" className="relative">
				<Image src="/logo.png" alt="logo" fill suppressHydrationWarning />
			</Link>
		</Button>
	);
};

export default Logo;
