import { auth } from "@clerk/nextjs/server";
import { fetchFavoriteId } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ propertyId }: { propertyId: string }) {
	const { userId } = await auth();

	if (!userId) return null; //<CardSignInButton />;
	const favoriteId = await fetchFavoriteId({ propertyId });
	return <FavoriteToggleForm propertyId={propertyId} favoriteId={favoriteId} />;
}

export default FavoriteToggleButton;
