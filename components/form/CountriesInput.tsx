import { formattedCountries } from "@/utils/countries";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "../ui/select";
import { Label } from "../ui/label";
import Image from "next/image";

export default function CountriesInput({
	defaultValue
}: {
	defaultValue?: string;
}) {
	const name = "country";
	return (
		<div className="mb-2">
			<Label htmlFor={name} className="capitalize">
				Country
			</Label>
			<Select
				defaultValue={defaultValue || formattedCountries[0].name}
				name={name}
				required
			>
				<SelectTrigger id={name}>
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					{formattedCountries.map(country => {
						return (
							<SelectItem key={country.code} value={country.code}>
								<span className="flex items-center gap-2">
									<Image
										src={country.flag}
										alt={country.name}
										width={16}
										height={16}
									/>
									{country.name}
								</span>
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		</div>
	);
}
