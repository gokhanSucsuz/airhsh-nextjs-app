"use client";
import { useSearchParams } from "next/navigation";
import React from "react";

const CheckoutPage = () => {
	const searchParams = useSearchParams();
	console.log(searchParams.get("example"));

	return <h1 className="text-3xl">CheckoutPage</h1>;
};

export default CheckoutPage;
