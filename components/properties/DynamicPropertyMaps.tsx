"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";
import React from "react";

const DynamicMap = dynamic(
	() => import("@/components/properties/PropertyMap"),
	{
		ssr: false,
		loading: () => <Skeleton className="h-[400px] w-full" />
	}
);
const DynamicPropertyMaps = React.memo(
	({ countryCode }: { countryCode: string }) => {
		return <DynamicMap countryCode={countryCode} />;
	}
);

DynamicPropertyMaps.displayName = "DynamicPropertyMaps";
export default DynamicPropertyMaps;
