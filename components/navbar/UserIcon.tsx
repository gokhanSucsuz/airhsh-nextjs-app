"use client";
import { useState, useEffect } from "react";
import { LucideUser2 } from "lucide-react";
import Image from "next/image";
import { fetchProfileImage } from "@/utils/actions";

const UserIcon = () => {
	const [profileImage, setProfileImage] = useState<string | null>(null);
	useEffect(() => {
		const fetchData = async () => {
			
			const fetchedImage = await fetchProfileImage();
			setProfileImage(fetchedImage ?? null);
		};
		fetchData();
	}, []);

	if (!profileImage)
		return (
			<LucideUser2 className="w-6 h-6 bg-primary rounded-full text-white" />
		);

	return <Image src={profileImage} alt="profile image" width={32} height={32}
		className="w-6 h-6 bg-white rounded-full text-white" />;
};

export default UserIcon;

