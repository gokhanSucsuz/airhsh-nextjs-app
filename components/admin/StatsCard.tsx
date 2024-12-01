import React from "react";
import { Card, CardHeader } from "../ui/card";
import { formatCurrency } from "@/utils/format";

const StatsCard = ({
	title,
	value,
	money
}: {
	title: string;
	value: number | string;
	money?: boolean;
}) => {
	return (
		<Card className="bg-muted">
			<CardHeader className="flex flex-row justify-between items-center">
				<h3 className="font-bold text-3xl capitalize">
					{title}
				</h3>
				<span className="text-primary text-5xl font-extrabold">
					{money && formatCurrency(value as number)}
					{!money && value}
				</span>
			</CardHeader>
		</Card>
	);
};

export default StatsCard;
