"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { LuMinus, LuPlus } from "react-icons/lu";

const CounterInput = ({
	detail,
	defaultValue
}: {
	detail: string;
	defaultValue?: number;
}) => {
	const [count, setCount] = useState(defaultValue || 0);

	const increaseCount = () => {
		setCount(count + 1);
	};
	const decreaseCount = () => {
		if (count > 0) setCount(count - 1);
	};
	return (
		<Card className="mb-4">
			<input type="hidden" name={detail} value={count} />
			<CardHeader className="flex flex-col gap-y-5">
				<div className="flex items-center justify-between flex-wrap">
					<div className="flex flex-col">
						<h2 className="font-medium capitalize">
							{detail}
						</h2>
						<p className="text-muted-foreground tex-sm">
							Specify the number of {detail}
						</p>
					</div>
					<div className="flex items-center gap-x-4">
						<Button type="button" variant={"outline"} onClick={decreaseCount}>
							<LuMinus className="w-5 h-5 text-primary" />
						</Button>
						<span className="text-xl font-bold w-5 text-center">
							{count}
						</span>
						<Button type="button" variant={"outline"} onClick={increaseCount}>
							<LuPlus className="w-5 h-5 text-primary" />
						</Button>
					</div>
				</div>
			</CardHeader>
			<CardContent />
		</Card>
	);
};

export default CounterInput;
