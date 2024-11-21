import { fetchProperties } from "@/utils/actions";
import React from "react";
import EmptyList from "./EmptyList";
import PropertiesList from "./PropertiesList";

const PropertiesContainer = async ({
	category,
	search
}: {
	category?: string;
	search?: string;
}) => {
	const properties: PropertyCardProps[] = await fetchProperties({
		category,
		search
	});
	if (properties.length === 0)
		return (
			<EmptyList
				heading="No results."
				message="Try changing your search criteria."
				btnText="clear filters"
			/>
		);
	return <PropertiesList properties={properties} />;
};

export default PropertiesContainer;
