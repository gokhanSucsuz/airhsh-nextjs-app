import { categories } from "@/utils/categories";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import Link from "next/link";

interface CategoriesListProps {
	searchParams: {
		category?: string;
		search?: string;
	};
}

const CategoriesList = async ({ searchParams }: CategoriesListProps) => {
	const { category, search } = searchParams;
	const searchTerm = search ? `&search=${search}` : "";

	return (
		<section>
			<ScrollArea className="py-6">
				<div className="flex gap-x-4">
					{categories.map(item => {
						const isActive = item.label === category;
						return (
							<Link
								key={item.label}
								href={`/?category=${item.label}${searchTerm}`}
								className="flex items-center gap-x-2 py-2 px-4 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100 hover:text-gray-900"
							>
								<article
									className={`p-3 flex flex-col items-center cursor-pointer duration-300 hover:text-primary w-[100px] ${isActive
										? "text-primary"
										: ""}`}
								>
									{item.icon && <item.icon className="h-8 w-8" />}
									<p className="capitalize text-sm mt-1">
										{item.label}
									</p>
								</article>
							</Link>
						);
					})}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</section>
	);
};

export default CategoriesList;
