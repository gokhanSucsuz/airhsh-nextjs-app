import CountryFlagAndName from "@/components/card/CountryFlagAndName";
import EmptyList from "@/components/home/EmptyList";
import Stats from "@/components/reservations/Stats";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from "@/components/ui/table";
import { fetchReservations } from "@/utils/actions";
import { formatCurrency, formatDate } from "@/utils/format";
import Link from "next/link";
import React from "react";

const ReservationsPage = async () => {
	const reservations = await fetchReservations();
	if (reservations.length === 0)
		return <EmptyList heading="No Reservations Found" />;
	return (
		<>
					<Stats />
		<div className="mt-16">

			<h4 className="mb-4 capitalize">
				total reservations : {reservations.length}
			</h4>
			<Table>
				<TableCaption>A list of recent reservations</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead>Property Name</TableHead>
						<TableHead>Country</TableHead>
						<TableHead>Nights</TableHead>
						<TableHead>Total</TableHead>
						<TableHead>Check In</TableHead>
						<TableHead>Check Out</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{reservations.map(item => {
						const { id, orderTotal, totalNights, checkIn, checkOut } = item;
						const { id: propertyId, name, country } = item.property;
						return (
							<TableRow key={id}>
								<TableCell>
									<Link
										href={`/properties/${propertyId}`}
										className="underline text-muted-foreground tracking-wide"
									>
										{name}
									</Link>
								</TableCell>
								<TableCell>
									<CountryFlagAndName countryCode={country} />
								</TableCell>
								<TableCell>
									{totalNights}
								</TableCell>
								<TableCell>
									{formatCurrency(orderTotal)}
								</TableCell>
								<TableCell>
									{formatDate(checkIn)}
								</TableCell>
								<TableCell>
									{formatDate(checkOut)}
								</TableCell>
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
		</>
	);
};

export default ReservationsPage;
