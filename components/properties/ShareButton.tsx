"use client";
import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
	LinkedinIcon,
	TwitterIcon,
	FacebookIcon,
	TwitterShareButton,
	LinkedinShareButton,
	FacebookShareButton,
	EmailIcon,
	EmailShareButton
} from "react-share";
import { Share2Icon } from "lucide-react";

const ShareButton = ({
	propertyId,
	name
}: {
	propertyId: string;
	name: string;
}) => {
	const url = process.env.NEXT_PUBLIC_WEBSITE_URL;
	const shareLink = `${url}/properties/${propertyId}`;
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant={"outline"} size="icon" className="p-2">
					<Share2Icon />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side="top"
				align="end"
				sideOffset={10}
				className="flex items-center gap-x-2 justify-center w-full"
			>
				<FacebookShareButton url={shareLink} title={name}>
					<FacebookIcon size={32} round />
				</FacebookShareButton>
				<TwitterShareButton url={shareLink} title={name}>
					<TwitterIcon size={32} round />
				</TwitterShareButton>
				<LinkedinShareButton url={shareLink} title={name}>
					<LinkedinIcon size={32} round />
				</LinkedinShareButton>
				<EmailShareButton url={shareLink} title={name}>
					<EmailIcon size={32} round />
				</EmailShareButton>
			</PopoverContent>
		</Popover>
	);
};

export default ShareButton;
