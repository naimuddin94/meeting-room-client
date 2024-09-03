type dropdownMenu = { title: string; href: string; description: string };

export type navItem = {
  label: string;
  href?: string;
  children?: dropdownMenu[];
};

export const adminNavItems: navItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Meeting Room",
    href: "/meeting-room",
  },
  {
    label: "Dashboard",
    children: [
      {
        title: "Slots",
        href: "/dashboard/slots",
        description: "Slots management for room bookings",
      },
      {
        title: "Add Room",
        href: "/dashboard/add-room",
        description: "Add a new room to your website.",
      },
      {
        title: "Manage Rooms",
        href: "/dashboard/manage-rooms",
        description: "Edit or remove existing rooms.",
      },
      {
        title: "Bookings",
        href: "/dashboard/bookings",
        description: "View and manage all customer bookings.",
      },
      {
        title: "Add Admin",
        href: "/dashboard/add-admin",
        description: "Add administration user for management.",
      },
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        description: "Track your booking history and status.",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

export const userNavItems: navItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Meeting Room",
    href: "/meeting-room",
  },
  {
    label: "Dashboard",
    children: [
      {
        title: "Profile",
        href: "/dashboard/profile",
        description: "View and edit your personal information.",
      },
      {
        title: "My Bookings",
        href: "/dashboard/my-bookings",
        description: "Track your booking history and status.",
      },
      {
        title: "Carts",
        href: "/dashboard/carts",
        description: "View items in your shopping cart.",
      },
      {
        title: "Ratings",
        href: "/dashboard/ratings",
        description: "Rate and review purchased rooms.",
      },
    ],
  },
  {
    label: "About Us",
    href: "/about-us",
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];
