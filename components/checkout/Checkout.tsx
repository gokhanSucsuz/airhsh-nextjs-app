"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import {
	EmbeddedCheckoutProvider,
	EmbeddedCheckout
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = await loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Checkout = () => {
	const searchParams = useSearchParams();
	const bookingId = searchParams.get("bookingId");

	const fetchClientSecret = useCallback(
		async () => {
			if (bookingId) {
				const response = await axios.post("/api/payment", { bookingId });
				return response.data.clientSecret;
			}
			return null;
		},
		[bookingId]
	);

	const options = { fetchClientSecret };
	return (
		<EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
			<EmbeddedCheckout />
		</EmbeddedCheckoutProvider>
	);
};

export default Checkout;
