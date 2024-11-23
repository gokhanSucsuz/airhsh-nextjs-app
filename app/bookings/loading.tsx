import LoadingTable from "@/components/booking/LoadingTable";
import React from "react";

const loading = () => {
	return (
		<div className="mt-32">
			<LoadingTable rows={5} />
		</div>
	);
};

export default loading;
