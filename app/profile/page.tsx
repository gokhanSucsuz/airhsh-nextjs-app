import SubmitButton from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { fetchProfile, updateProfileAction } from "@/utils/actions";
import { redirect } from "next/navigation";
import React from "react";
import Image from "next/image";

const ProfilePage = async () => {
	const profile = await fetchProfile();
	if (!profile) redirect("/profile/create");
	return (
		<section>
			<h1 className="text-2xl font-semibold mb-8 capitalize">User Profile</h1>
			<div className="border p-8 rounded-md">
				<FormContainer action={updateProfileAction}>
					<Image src={profile.profileImage ?? "/no-profile-image.png"} alt={profile.firstName} width={1000} height={1000} className="w-24 h-24 bg-white rounded-full text-white" />
					<div className="grid md:grid-cols-2 gap-4 mt-4">
						<FormInput type="text" name="firstName" label="First Name" defaultValue={profile.firstName} />
						<FormInput type="text" name="lastName" label="Last Name" defaultValue={profile.lastName} />
						<FormInput type="text" name="username" label="Username" defaultValue={profile.username} />
					</div>
					<SubmitButton text="Update Profile" className="mt-8" />
				</FormContainer>
			</div>
		</section>
	);
};

export default ProfilePage;
