"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import FormContainer from "../form/FormContainer";
import { createReviewAction } from "@/utils/actions";
import RatingInput from "../form/RatingInput";
import TextareaInput from "../form/TextareaInput";
import SubmitButton from "../form/Buttons";

const SubmitReview = ({ propertyId }: { propertyId: string }) => {
	const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
	return (
		<div className="mt-8">
			<Button onClick={() => setIsReviewFormVisible(prev => !prev)}>
				Leave a Review
			</Button>
			{isReviewFormVisible &&
				<Card className="p-8 mt-8">
					<FormContainer action={createReviewAction}>
						<input type="hidden" name="propertyId" value={propertyId} />
						<RatingInput name="rating" />
						<TextareaInput
							name="comment"
							labelText="Write a comment"
							defaultValue="Great place!! Awesome!!!"
						/>
						<SubmitButton text="Submit Review" className="mt-4" />
					</FormContainer>
				</Card>}
		</div>
	);
};

export default SubmitReview;
