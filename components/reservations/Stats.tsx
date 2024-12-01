import { fetchReservationStats } from "@/utils/actions";
import React from "react";
import StatsCard from "../admin/StatsCard";

const Stats = async () => {
	const stats = await fetchReservationStats();
	return (
		<div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
			<StatsCard title="properties" value={stats.properties || 0} />
			<StatsCard title="nights" value={stats.nights || 0} />
			<StatsCard title="amount" value={stats.amount || 0} money={true} />
		</div>
	);
};

export default Stats;
