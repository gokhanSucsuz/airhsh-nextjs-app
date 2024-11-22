import Image from "next/image";
import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import Rating from "./Rating";
import Comment from "./Comment";

type ReviewType = {
	reviewInfo: {
		comment: string;
		rating: number;
		name: string;
		image: string;
	};
	children?: React.ReactNode;
};

const ReviewCard = ({ reviewInfo, children }: ReviewType) => {
	return (
		<Card className="relative ">
			<CardHeader>
				<div className="flex items-center gap-4">
					<Image
						src={reviewInfo.image}
						alt="profile"
						width={64}
						height={64}
						className="w-12 h-12 rounded-full"
					/>
					<div className="ml-4">
						<h3 className="text-sm font-bold capitalize">
							{reviewInfo.name}
						</h3>
						<Rating rating={Number(reviewInfo.rating) || 0} />
					</div>
				</div>
			</CardHeader>
			<CardContent className="flex flex-col gap-y-2">
				<Comment comment={reviewInfo.comment} />
			</CardContent>
			<div className="absolute top-3 right-3">
				{children}
			</div>
		</Card>
	);
};

export default ReviewCard;
