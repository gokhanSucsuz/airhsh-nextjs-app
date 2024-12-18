import { fetchPropertyReviews } from "@/utils/actions";
import React from "react";
import ReviewCard from "./ReviewCard";
import Title from "../properties/Title";

const PropertyReviews = async ({ propertyId }: { propertyId: string }) => {
	const reviews = await fetchPropertyReviews(propertyId);
	if (reviews.length < 1) return null;
	return (
		<div className="mt-8 grid">
			<Title text="Reviews" />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{reviews.map(review => {
					const { comment, rating } = review;
					const { firstName, profileImage } = review.profile;
					const reviewInfo = {
						comment,
						rating,
						name: firstName,
						image: profileImage
					};
					return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
				})}
			</div>
		</div>
	);
};

export default PropertyReviews;
