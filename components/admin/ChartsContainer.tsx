import React from "react";
import Chart from "./Chart";
import { fetchChartsData } from "@/utils/actions";

const ChartsContainer = async () => {
	const bookings = await fetchChartsData();
	if (bookings.length < 1) return null;
	return (
		<div>
			<Chart data={bookings} />
		</div>
	);
};

export default ChartsContainer;
