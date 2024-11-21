import countries from "world-countries";

export const formattedCountries = countries.map(country => {
	const flagURL = `https://flagcdn.com/w320/${country.cca2.toLowerCase()}.png`;
	return {
		code: country.cca2,
		name: country.name.common,
		flag: flagURL,
		location: country.latlng,
		region: country.region
	};
});

export const findCountryByCode = (code: string) =>
	formattedCountries.find(country => country.code === code);
