"use client";

import { Booking } from "@/utils/types";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

type BookingWrapperProps = {
	propertyId: string;
	price: number;
	bookings: Booking[];
};
const DynamicWrapper = dynamic(() => import("./BookingWrapper"), {
	ssr: false,
	loading: () => <Skeleton className="h-[200px] w-full" />
});

export default function BookingDynamicWrapper({
	propertyId,
	price,
	bookings
}: BookingWrapperProps) {
	return <DynamicWrapper {...{ propertyId, price, bookings }} />;
}
