import { fetchProfileImage, fetchPropertyProfile } from "@/utils/actions";
import Image from "next/image";
import React from "react";

type UserInfoProps = {
	profile: {
		profileId: string;
		firstName: string;
		profileImage: string;
		createdAt: Date;
	};
};

const UserInfo = async ({
	profile: { profileId, firstName, profileImage, createdAt }
}: UserInfoProps) => {
	const profile = await fetchPropertyProfile(profileId);
	return (
		<article className="grid grid-cols-[auto,1fr] gap-4 mt-4">
			<Image
				src={(profileImage && profileImage) || "/profile.png"}
				alt={firstName}
				width={1000}
				height={1000}
				className="w-12 h-12 object-cover rounded-lg"
				priority
			/>
			<div className="flex flex-col">
				<p>
					Hosted by <span className="font-bold">{firstName}</span>
				</p>
				<div className="font-light text-muted-foreground">
					Superhost &middot; 2 years hosting
				</div>
			</div>
		</article>
	);
};

export default UserInfo;
