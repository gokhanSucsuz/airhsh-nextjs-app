"use client";
import { useSearchParams } from "next/navigation";

const ReviewsPage = () => {
	const searchParams = useSearchParams();
	console.log(searchParams.get("example"));

	return <h1 className="text-3xl">ReviewsPage</h1>;
};

export default ReviewsPage;
