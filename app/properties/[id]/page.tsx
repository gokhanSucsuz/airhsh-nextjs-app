import FavoriteToggleButton from "@/components/card/FavoriteToggleButton";
import PropertyRating from "@/components/card/PropertyRating";
import AmenitiesComp from "@/components/properties/AmenitiesComp";
import BreadCrumbs from "@/components/properties/BreadCrumbs";
import Description from "@/components/properties/Description";
import DynamicPropertyMaps from "@/components/properties/DynamicPropertyMaps";
import BookingDynamicWrapper from "@/components/booking/BookingDynamicWrapper";
import ImageContainer from "@/components/properties/ImageContainer";
import PropertyDetails from "@/components/properties/PropertyDetails";
import ShareButton from "@/components/properties/ShareButton";
import UserInfo from "@/components/properties/UserInfo";
import PropertyReviews from "@/components/reviews/PropertyReviews";
import SubmitReview from "@/components/reviews/SubmitReview";
import { Separator } from "@/components/ui/separator";
import { fetchPropertyDetail, findExistingReview } from "@/utils/actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

type ParamsType = Promise<{ id: string }>;

async function PropertyDetailsPage({ params }: { params: ParamsType }) {
	const { id } = await params;
	const property = await fetchPropertyDetail(id);

	if (!property) redirect("/");
	const { baths, bedrooms, beds, guests } = property;
	const details = { baths, bedrooms, beds, guests };
	const profile = {
		profileId: property.profile.clerkId,
		firstName: property.profile.firstName,
		profileImage: property.profile.profileImage,
		createdAt: property.profile.createdAt
	};

	const { userId } = await auth();
	const isNotOwner = property.profile.clerkId !== userId;

	const reviewDoesNotExist = userId && isNotOwner && !await findExistingReview(userId, property.id);

	return (
		<section>
			<BreadCrumbs name={property.name} />
			<header className="flex justify-between items-center mt-4">
				<h1 className="text-4xl font-bold capitalize">
					{property.tagline}
				</h1>
				<div className="flex items-center gap-x-4">
					<ShareButton propertyId={property.id} name={property.name} />
					{/* <FavoriteToggleButton propertyId={property.id} /> */}
					<Suspense fallback={null}>
						<FavoriteToggleButton propertyId={property.id} />
					</Suspense>
				</div>
			</header>
			<ImageContainer mainImage={property.image} name={property.name} />
			<section className="lg:grid lg:grid-cols-12 gap-x-12 mt-12">
				<div className="lg:col-span-8">
					<div className="flex gap-x-4 items-center">
						<h1 className="text-xl font-bold">
							{property.name}
						</h1>
						<PropertyRating inPage={true} propertyId={property.id} />
					</div>
					<PropertyDetails details={details} />
					<UserInfo profile={profile} />
					<Separator className="mt-4" />
					<Description description={property.description} />
					<AmenitiesComp amenities={property.amenities} />
					<Separator className="mt-4" />
					<DynamicPropertyMaps countryCode={property.country} />
				</div>
				<div className="lg:col-span-4 flex flex-col items-center">
					<BookingDynamicWrapper
						propertyId={property.id}
						price={property.price}
						bookings={property.bookings}
					/>
				</div>
			</section>
			{reviewDoesNotExist && <SubmitReview propertyId={property.id} />}
			<PropertyReviews propertyId={property.id} />
		</section>
	);
}

export default PropertyDetailsPage;
