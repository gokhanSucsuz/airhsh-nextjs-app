"use client";
import {  useEffect, useState } from "react";
import { LucideUser2 } from "lucide-react";
import Image from "next/image";
import { fetchProfileImage } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";


const UserIcon = () => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	 const { isSignedIn } = useAuth();
	useEffect(() => {
		const fetchData = async () => {
			const fetchedImage = await fetchProfileImage();
			setProfileImage(fetchedImage ?? null);
		};
		fetchData();
	}, [profileImage]);

	useEffect(() => {
		 if(!isSignedIn) setProfileImage(null)
	},[isSignedIn])
	

	if (!profileImage)
		return (
			<LucideUser2 className="w-6 h-6 bg-primary rounded-full text-white" />
		);

	return <Image src={profileImage} alt="profile image" width={32} height={32}
		className="w-6 h-6 bg-white rounded-full text-white" />;
};

export default UserIcon;

