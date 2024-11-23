import { calculateDaysBetween } from "./calendar";

type BookingDetails = {
	checkIn: Date;
	checkOut: Date;
	price: number;
};

export const calculateTotals = ({
	checkIn,
	checkOut,
	price
}: BookingDetails) => {
	const totalNights = calculateDaysBetween({ checkIn, checkOut });
	const subTotal = totalNights * price;
	const cleaning = 19;
	const service = 39;
	const tax = subTotal * 0.1;
	const orderTotal = subTotal + cleaning + service + tax;
	return { totalNights, cleaning, service, tax, orderTotal, subTotal };
};
