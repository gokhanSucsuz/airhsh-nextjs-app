"use client";
import { Booking } from "@/utils/types";
import React, { useEffect } from "react";
import useProperty from "@/utils/store";
import BookingCalendar from "./BookingCalendar";
import BookingContainer from "./BookingContainer";
type BookingWrapperProps = {
	propertyId: string;
	price: number;
	bookings: Booking[];
};
const BookingWrapper = ({
	propertyId,
	price,
	bookings
}: BookingWrapperProps) => {
	useEffect(() => {
		console.log(propertyId, price, bookings)
		useProperty.setState({ propertyId, price, bookings });
	}, []);
    return <>
        <BookingCalendar />
        <BookingContainer />
    </>
};

export default BookingWrapper;
