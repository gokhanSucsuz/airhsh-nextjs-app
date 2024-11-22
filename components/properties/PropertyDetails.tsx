import { formatQuantity } from "@/utils/actions";
import React from "react";

type PropertyDetailsProps = {
	details: {
		bedrooms: number;
		beds: number;
		baths: number;
		guests: number;
	};
};
const PropertyDetails = ({
	details: { bedrooms, beds, baths, guests }
}: PropertyDetailsProps) => {
	return (
		<p className="text-md font-light">
			<span>
				{formatQuantity(bedrooms, "bedroom")} &middot;
			</span>
			<span>
				{formatQuantity(baths, "bath")}&middot;
			</span>
			<span>
				{formatQuantity(beds, "bed")}&middot;
			</span>
			<span>
				{formatQuantity(guests, "guest")}
			</span>
		</p>
	);
};

export default PropertyDetails;
