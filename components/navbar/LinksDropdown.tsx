"use client";
import {
	DropdownMenu,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { LuAlignLeft } from "react-icons/lu";
import { links } from "@/utils/links";
import Link from "next/link";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { SignedIn, SignUpButton, useAuth } from "@clerk/clerk-react";
import SignOutLink from "./SignOutLink";
import UserIcon from "./UserIcon";
import { Suspense, useEffect, useState } from "react";

const LinksDropdown = () => {
	const { userId } = useAuth();
	const [isAdminUser, setIsAdminUser] = useState(false);
	const admin = process.env.NEXT_PUBLIC_ADMIN_USER_ID;
	useEffect(
		() => {
			if (userId) {
				setIsAdminUser(userId === admin);
			}
		},
		[userId, admin]
	);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="flex gap-4 max-w-[100px]">
					<LuAlignLeft className="w-6 h-6" />
					<UserIcon />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-52" align="start" sideOffset={10}>
				<SignedOut>
					<DropdownMenuItem>
						<SignInButton mode="modal">
							<button className="w-full text-left">Login</button>
						</SignInButton>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<SignUpButton mode="modal">
							<button className="w-full text-left">Register</button>
						</SignUpButton>
					</DropdownMenuItem>
				</SignedOut>
				<SignedIn>
					{links.map(link => {
						if (link.label === "admin" && !isAdminUser) return null;
						return (
							<Suspense fallback={null} key={link.href}>
								<DropdownMenuItem key={link.href}>
									<Link href={link.href} className="capitalize w-full">
										{link.label}
									</Link>
								</DropdownMenuItem>
							</Suspense>
						);
					})}
					<DropdownMenuSeparator />
					<DropdownMenuItem>
						<SignOutLink />
					</DropdownMenuItem>
				</SignedIn>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default LinksDropdown;
