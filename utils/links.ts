type NavLink = {
	href: string;
	label: string;
};

export const links: NavLink[] = [
	{ href: "/", label: "Home" },
	{ href: "/favorites", label: "Favorites" },
	{ href: "/bookings", label: "Bookings" },
	{ href: "/reviews", label: "Reviews" },
	{ href: "/reservations", label: "Reservations" },
	{ href: "/rentals/create", label: "Create Rental" },
	{ href: "/rentals", label: "My Rentals" },
	{ href: "/admin", label: "Admin" },
	{ href: "/profile", label: "Profile" }
];
