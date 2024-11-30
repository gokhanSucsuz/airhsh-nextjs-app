import { fetchStats } from "@/utils/actions";
import React from "react";
import StatsCard from "./StatsCard";

const StatsContainer = async () => {
	const { usersCount, propertiesCount, bookingsCount } = await fetchStats();
	return (
		<div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
			<StatsCard title="users" value={usersCount || 0} />
			<StatsCard title="properties" value={propertiesCount || 0} />
			<StatsCard title="bookings" value={bookingsCount || 0} />
		</div>
	);
};

export default StatsContainer;
