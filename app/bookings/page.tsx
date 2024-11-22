"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const BookingsPage = () => {
	const searchParams = useSearchParams();
	console.log(searchParams.get("example"));

	return <h1 className="text-3xl">BookingsPage</h1>;
};

export default BookingsPage;
