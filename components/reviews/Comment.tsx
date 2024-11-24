"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Comment = ({ comment }: { comment: string }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const toggleExpanded = () => {
		void setIsExpanded(!isExpanded);
	};
	const longComment = comment.length > 130;
	const displayComment = isExpanded ? comment : `${comment.slice(0, 130)}...`;
	return (
		<div>
			<p className="text-sm">
				{displayComment}
			</p>
			{longComment &&
				<Button
					variant="link"
					size="sm"
					onClick={toggleExpanded}
					className="text-xs pl-0 text-muted-foreground"
				>
					{isExpanded ? "Show less" : "Show more"}
				</Button>}
		</div>
	);
};

export default Comment;
