"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "../ui/skeleton";

const DynamicFav = dynamic(() => import("./FavoriteToggleButton"), {
	ssr: false,
	loading: () => <Skeleton className="h-[400px] w-full" />
});
const DynamicFavToggleButton = ({ propertyId }: { propertyId: string }) => {
	return <DynamicFav propertyId={propertyId} />;
};
DynamicFavToggleButton.displayName = "DynamicFavoriteToggleButton";
export default DynamicFavToggleButton;
