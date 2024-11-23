"use client";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
	defaultSelected,
	generateBlockedPeriods,
	generateDateRange,
	generateDisabledDates
} from "../../utils/calendar";
import { Calendar } from "../ui/calendar";
import useProperty from "@/utils/store";
import { useToast } from "@/hooks/use-toast";

const BookingCalendar = () => {
	const currentDate = new Date();
	const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

	const bookings = useProperty(state => state.bookings);
	const { toast } = useToast();
	const blockedPeriods = generateBlockedPeriods({
		bookings,
		today: currentDate
	});

	const unavailableDates = generateDisabledDates(blockedPeriods);

	useEffect(
		() => {
			const selectedRange = generateDateRange(range);
			const isDisabledDateIncluded = selectedRange.some(date => {
				if (unavailableDates[date]) {
					setRange(defaultSelected);
					toast({
						description: "Some dates are booked. Please select again!"
					});
					return true;
				}
				return false;
			});
			useProperty.setState({ range });
		},
		[range]
	);

	return (
		<Calendar
			mode="range"
			defaultMonth={currentDate}
			selected={range}
			onSelect={setRange}
			className="mb-4"
			disabled={blockedPeriods}
		/>
	);
};
export default BookingCalendar;
