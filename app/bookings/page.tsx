import CountryFlagAndName from "@/components/card/CountryFlagAndName";
import { IconButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import EmptyList from "@/components/home/EmptyList";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { deleteBookingAction, fetchBookings } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";
import React from "react";

const BookingsPage = async () => {
	const bookings = await fetchBookings();

	if (bookings.length === 0) return <EmptyList />;

	return (
		<div className="mt-16">
			<h4 className="mb-4 capitalize">
				total bookings: {bookings.length}
			</h4>
			<Table>
				<TableCaption>A list of your recent bookings</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Property Name</TableHead>
						<TableHead>Country</TableHead>
						<TableHead>Nights</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Check In</TableHead>
						<TableHead>Check Out</TableHead>
						<TableHead>Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{bookings.map(book => {
						return (
							<TableRow key={book.id}>
								<TableCell>
									<Link
										href={`/properties/${book.property.id}`}
										className="capitalize"
									>
										{book.property.name}
									</Link>
								</TableCell>
								<TableCell>
									<CountryFlagAndName countryCode={book.property.country} />
								</TableCell>
								<TableCell>
									{book.totalNights}
								</TableCell>
								<TableCell>
									{formatCurrency(book.orderTotal)}
								</TableCell>
								<TableCell>
									{formatDate(book.checkIn)}
								</TableCell>
								<TableCell>
									{formatDate(book.checkOut)}
								</TableCell>
								<TableCell>
									{DeleteBooking({ bookingId: book.id })}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

function DeleteBooking({ bookingId }: { bookingId: string }) {
	const deleteBooking = deleteBookingAction.bind(null, { bookingId });
	return (
		<FormContainer action={deleteBooking}>
			<IconButton actionType="delete" />
		</FormContainer>
	);
}

export default BookingsPage;
