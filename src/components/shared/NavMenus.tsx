import { currentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminNavItems, navItem, userNavItems } from "@/utils/navtems";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ListItem } from "../ui/ListItem";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../ui/navigation-menu";

const NavMenus = () => {
  const { pathname } = useLocation();
  const [menus, setMenus] = useState<navItem[]>(userNavItems);
  const user = useAppSelector(currentUser);
  useEffect(() => {
    if (user?.role === "admin") {
      setMenus(adminNavItems);
    } else {
      setMenus(userNavItems);
    }
  }, [user]);
  return (
    <ul className="items-center gap-5 py-3">
      <NavigationMenu>
        <NavigationMenuItem className="flex flex-col lg:flex-row">
          {menus?.map((menu) => {
            if (menu.href) {
              return (
                <Link to={menu.href} key={menu.label}>
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} ${
                      pathname === menu.href
                        ? "border border-theme/40 bg-transparent"
                        : "bg-transparent"
                    }`}
                  >
                    {menu.label}
                  </NavigationMenuLink>
                </Link>
              );
            } else if (menu.children) {
              return (
                <React.Fragment key={menu.label}>
                  <NavigationMenuTrigger
                    className={
                      pathname.includes("dashboard")
                        ? "border border-theme/40 bg-transparent"
                        : "bg-transparent"
                    }
                  >
                    Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                      {menu.children?.map((component) => (
                        <ListItem
                          key={component.title}
                          title={component.title}
                          href={component.href}
                        >
                          {component.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </React.Fragment>
              );
            }
          })}
        </NavigationMenuItem>
      </NavigationMenu>
    </ul>
  );
};

export default NavMenus;
