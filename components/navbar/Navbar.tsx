import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";
import Logo from "./Logo";
import { DarkMode } from "./DarkMode";

const Navbar = () => {
	return <nav className="border-b">
			<div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
				<div className="w-full sm:w-fit flex justify-center">
					<Logo />
				</div>
				<div className="w-full sm:max-w-xs flex justify-center">
					<NavSearch />
				</div>
				<div className="flex gap-4 items-center justify-around sm:justify-end w-full lg:max-w-xs">
					<DarkMode />
					<LinksDropdown />
				</div>
			</div>
		</nav>;
};

export default Navbar;
