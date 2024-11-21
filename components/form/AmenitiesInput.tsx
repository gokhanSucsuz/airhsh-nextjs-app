"use client";
import { amenities, Amenity } from "@/utils/amenities";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

const AmenitiesInput = ({ defaultValue }: { defaultValue?: Amenity[] }) => {
	const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
		defaultValue || amenities
	);
	const handleChange = (amenity: Amenity) => {
		setSelectedAmenities(prev =>
			prev.map(a => {
				if (a.name === amenity.name) {
					return { ...a, selected: !a.selected };
				}
				return a;
			})
		);
	};
	return (
		<section>
			<input
				type="hidden"
				name="amenities"
				value={JSON.stringify(selectedAmenities)}
			/>
			<div className="grid grid-cols-2 gap-4">
				{selectedAmenities.map(amenity =>
					<div key={amenity.name} className="flex items-center space-x-2">
						<Checkbox
							checked={amenity.selected}
							name={amenity.name}
							id={amenity.name}
							onCheckedChange={() => handleChange(amenity)}
						/>
						<Label
							htmlFor={amenity.name}
							className="flex items-center gap-x-2 text-sm font-medium leading-none capitalize"
						>
							{amenity.name}
							{amenity.icon && <amenity.icon />}
						</Label>
					</div>
				)}
			</div>
		</section>
	);
};

export default AmenitiesInput;
