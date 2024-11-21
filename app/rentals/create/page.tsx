import Amenities from "@/components/form/AmenitiesInput";
import SubmitButton from "@/components/form/Buttons";
import CategoriesInput from "@/components/form/CategoriesInput";
import CounterInput from "@/components/form/CounterInput";
import CountriesInput from "@/components/form/CountriesInput";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import ImageInput from "@/components/form/ImageInput";
import PriceInput from "@/components/form/PriceInput";
import TextareaInput from "@/components/form/TextareaInput";
import { createPropertyAction } from "@/utils/actions";
import React from "react";

const CreatePropertyPage = () => {
	return (
		<section>
			<h1 className="text-2xl font-semibold mb-8 capitalize">
				create property
			</h1>
			<div className="border p-8 rounded">
				<h3 className="text-lg mb-4 font-medium">General Info</h3>
				<FormContainer action={createPropertyAction}>
					<div className="grid md:grid-cols-2 gap-8 mt-4">
						<FormInput
							type="text"
							name="name"
							label="Name (20 limit)"
							defaultValue="Cabin in USA"
						/>
						<FormInput
							type="text"
							name="tagline"
							label="Tagline (30 limit)"
							defaultValue="Go confidently in the direction of your dreams. Live the life you have imagined."
						/>
						<PriceInput defaultValue={100} />
						<CategoriesInput />
					</div>
					<TextareaInput
						name="description"
						labelText="Description (10-100 words)"
					/>
					<div className="grid sm:grid-cols-2 gap-8 mt-4">
						<CountriesInput />
						<ImageInput />
					</div>

					<h3 className="font-medium text-lg mt-8 mb-4">
						Accomodation Details
					</h3>
					<CounterInput detail="guests" />
					<CounterInput detail="bedrooms" />
					<CounterInput detail="beds" />
					<CounterInput detail="baths" />

					<h3 className="font-medium text-lg mt-8 mb-4">Amenities</h3>
					<Amenities />
					<SubmitButton text="Create Rental" className="mt-12" />
				</FormContainer>
			</div>
		</section>
	);
};

export default CreatePropertyPage;
