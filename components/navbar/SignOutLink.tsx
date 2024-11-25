"use client";
import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";
import React from "react";

const SignOutLink = () => {
	const { toast } = useToast();
	const handleLogout = async () => {
		toast({ title: "Signout", description: "SignOut successfully" });
	};

	return (
		<SignOutButton redirectUrl="/">
			<button className="w-full text-left" onClick={handleLogout}>
				<span>Sign Out</span>
			</button>
		</SignOutButton>
	);
};

export default SignOutLink;
