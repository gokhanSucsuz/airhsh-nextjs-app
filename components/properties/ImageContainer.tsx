import Image from "next/image";

const ImageContainer = ({
	mainImage,
	name
}: {
	mainImage: string;
	name: string;
}) => {
	return (
		<section className="h-[300px] md:h-[500px] relative mt-8 group">
			<div className="relative h-[300px] md:h-[500px] mb-2 overflow-hidden rounded-md">
				<Image
					src={mainImage}
					fill
					sizes="100vw"
					alt={name}
					className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
					priority
				/>
			</div>
		</section>
	);
};

export default ImageContainer;
