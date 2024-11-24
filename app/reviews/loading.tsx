"use client";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
	return (
		<section className="grid md:grid-cols-2 mt-4 px-2">
			<ReviewLoadingCard />
			<ReviewLoadingCard />
		</section>
	);
};

const ReviewLoadingCard = () => {
	return (
		<Card>
			<CardHeader>
				<div className="flex items-center">
					<Skeleton className="h-12 w-12 rounded-full" />
					<div className="mx-4 py-2">
						<Skeleton className="h-4 w-[100px] my-1" />
						<Skeleton className="h-4 w-[100px] my-1" />
					</div>
				</div>
				<Skeleton className="h-4 w-full my-1" />
				<Skeleton className="h-4 w-full my-1" />
				<Skeleton className="h-4 w-full my-1" />
			</CardHeader>
		</Card>
	);
};

export default loading;
