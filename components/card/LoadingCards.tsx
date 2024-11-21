import { Skeleton } from "@/components/ui/skeleton";

export function LoadingCards() {
	return (
		<div className="mt-4 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
			<SkeletonCard />
		</div>
	);
}

export function SkeletonCard() {
	return (
		<div className="flex flex-col space-y-3">
			<Skeleton className="h-[300px] w-[250px] rounded-xl" />
			<div className="space-y-2 w-[250px]">
				<div className="flex justify-between items-center">
					<Skeleton className="h-4 w-[100px]" />
					<Skeleton className="h-4 w-[100px]" />
				</div>
				<Skeleton className="h-4 w-[250px]" />
				<div className="flex justify-between items-center">
					<Skeleton className="h-4 w-[100px]" />
					<Skeleton className="h-4 w-[100px]" />
				</div>
			</div>
		</div>
	);
}
