import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { fetchRentals } from "@/utils/actions";
import React from "react";
import { deleteRentalAction } from "../../utils/actions";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
import EmptyList from "@/components/home/EmptyList";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";

const RentalsPage = async () => {
	const rentals = await fetchRentals();
	if (rentals.length === 0)
		return (
			<EmptyList
				heading="No rentals found"
				message="Do not hesitate to create a rental."
			/>
		);
	console.log("rentals:", rentals);

	return (
		<div className="mt-16">
			<div className="mb-4 capitalize">
				<Table>
					<TableCaption>A list of your rentals</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Property Name</TableHead>
							<TableHead>Nightly Rate</TableHead>
							<TableHead>Nights Booked</TableHead>
							<TableHead>Total Income</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rentals.map(rental =>
							<TableRow key={rental.id}>
								<TableCell>
									<Link
										href={`/properties/${rental.id}`}
										className="capitalize"
									>
										{rental.name}
									</Link>
								</TableCell>
								<TableCell>
									{formatCurrency(rental.price)}
								</TableCell>
								<TableCell>
									{rental.totalNightSum || 0}
								</TableCell>
								<TableCell>
									{rental.totalOrderSum || 0}
								</TableCell>
								<TableCell className="flex items-center gap-x-2">
									<Link href={`/rentals/${rental.id}/edit`}>
										<IconButton actionType="edit" />
									</Link>
									<DeleteRental propertyId={rental.id} />
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

const DeleteRental = ({ propertyId }: { propertyId: string }) => {
	const deleteRental = deleteRentalAction.bind(null, {
		propertyId
	});
	return (
		<FormContainer action={deleteRental}>
			<IconButton actionType="delete" />
		</FormContainer>
	);
};

export default RentalsPage;
