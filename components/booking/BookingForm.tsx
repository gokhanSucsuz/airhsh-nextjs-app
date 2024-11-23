import { calculateTotals } from "@/utils/calculateTotals";
import { formatCurrency } from "@/utils/format";
import useProperty from "@/utils/store";
import React from "react";
import { Card, CardTitle } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";

const BookingForm = () => {

	const { range, price } = useProperty(state => state)
	const checkIn = range?.from as Date
	const checkOut = range?.to as Date
	const {totalNights, cleaning, service, tax, orderTotal, subTotal} = calculateTotals({checkIn, checkOut, price})
	return		<Card className="p-8 mb-4">
			<CardTitle className="mb-8 text-primary">
			Summary
			</CardTitle>
				<FormRow label={`$${price} x ${totalNights} nights}`} amount={subTotal} />
				<FormRow label="Cleaning Fee" amount={cleaning} />
				<FormRow label="Service Fee" amount={service} />
				<FormRow label="Tax" amount={tax} />
				<FormRow label="Total" amount={orderTotal} />
				<Separator className="mt-4 border-b" />
				<CardTitle className="mt-8 text-primary">
					<FormRow label="Booking Total" amount={orderTotal} />
				</CardTitle>
		</Card>;
};

function FormRow({ label, amount }: { label: string, amount: number }) {
	return <p className="flex justify-between text-sm mb-2 ">
		<span>{label}</span>
		<span>{formatCurrency(amount)}</span>
	</p>
}

export default BookingForm;
