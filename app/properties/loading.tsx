import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const loading = () => {
	return <Skeleton className="h-[300px] md:h-[500px] w-full rounded" />;
};

export default loading;
