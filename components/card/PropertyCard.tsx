import { formattedCountries } from "@/utils/countries";
import { formatCurrency } from "@/utils/format";
import { PropertyCardProps } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PropertyRating from "./PropertyRating";
import FavoriteToggleButton from "./FavoriteToggleButton";
import CountryFlagAndName from "./CountryFlagAndName";
import { LoadingCards } from "./LoadingCards";

const PropertyCard = ({ property }: { property: PropertyCardProps }) => {
	const { name, image, price } = property;
	const { country, id: propertyId, tagline } = property;
	return (
		<article className="group relative shadow-md p-2 rounded-md">
			<Link href={`/properties/${propertyId}`}>
				<div className="relative h-[280px] mb-2 overflow-hidden rounded-md">
					<Image
						src={image}
						alt={name}
						fill
						className="object-cover rounded-md transform group-hover:scale-110 transition-transform duration-500"
						sizes="(max-width:768px) 100vw, 50vw"
					/>
				</div>
				<div className="flex justify-between items-center">
					<h3 className="text-sm font-semibold mt-1">
						{name.substring(0, 30)}
					</h3>
					<PropertyRating propertyId={propertyId} inPage={false} />
				</div>
				<p className="text-sm mt-1 text-muted-foreground">
					{tagline.substring(0, 40)}
				</p>
				<div className="flex justify-between items-center mt-1">
					<p className="text-sm mt-1">
						<span className="font-semibold">{formatCurrency(price)}</span>
						night
					</p>
					<CountryFlagAndName countryCode={country} />
				</div>
			</Link>
			<div className="absolute top-5 z-5 right-5">
				<FavoriteToggleButton propertyId={propertyId} />
			</div>
		</article>
	);
};

export default PropertyCard;
