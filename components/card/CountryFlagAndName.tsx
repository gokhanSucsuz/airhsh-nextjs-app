import { findCountryByCode, formattedCountries } from "@/utils/countries";
import Image from "next/image";
import React from "react";

const CountryFlagAndName = ({ countryCode }: { countryCode: string }) => {
	const validCountry = findCountryByCode(countryCode);
	const countryName = validCountry && validCountry?.name?.length > 20 ? validCountry?.name.slice(0,20)+"...": validCountry?.name
	
	return (
		<div className="flex items-center gap-2">
			<Image
				src={validCountry?.flag|| "https://flagcdn.com/w320/tr.png"}
				alt={formattedCountries[Math.floor(Math.random() * 150 + 1)].name}
				width={16}
				height={16}
			/>
			<span className="text-sm font-semibold">
				{countryName}
			</span>
		</div>
	);
};

export default CountryFlagAndName;
