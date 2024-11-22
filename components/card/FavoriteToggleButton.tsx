import { Button } from "../ui/button";
import { ImHeart } from "react-icons/im";
import { auth } from "@clerk/nextjs/server";
import { FaHeart } from "react-icons/fa";

async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
	const { userId } = await auth();

	if (!userId) return null;
	return (
		<Button
			variant={"outline"}
			className="p-2 cursor-pointer rounded-full"
			asChild
		>
			<FaHeart className="w-10 h-10" />
		</Button>
	);
}

export default FavoriteToggleButton;
