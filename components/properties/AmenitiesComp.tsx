import { Amenity } from "@/utils/amenities";
import Title from "./Title";
import { LuFolderCheck } from "react-icons/lu";

const AmenitiesComp = ({ amenities }: { amenities: string }) => {
	const amenitiesList: Amenity[] = JSON.parse(amenities as string);

	const noAmenities = amenitiesList.every(amenity => !amenity.selected);
	if (noAmenities) return null;
	return (
		<div className="mt-4">
			<Title text="What this place offers" />
			<div className="grid md:grid-cols-2 gap-x-4">
				{amenitiesList.map(amenity => {
					if (!amenity.selected) return null;
					return (
						<div key={amenity.name} className="flex items-center gap-x-4 mb-2">
							<LuFolderCheck className="w-6 h-6 text-primary" />
							<span className="font-light text-sm capitalize">
								{amenity.name}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default AmenitiesComp;