import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Home } from "lucide-react";
import { Book } from "lucide-react";
import { List } from "lucide-react";
import { AppWindow } from "lucide-react";
import { User } from "lucide-react";
import { Headset } from "lucide-react";
import { Layers } from "lucide-react";
import { Heart } from "lucide-react";
import { LayoutDashboard } from "lucide-react";
import { Users } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { FileBarChart2 } from "lucide-react";
import { Settings } from "lucide-react";
import { Search } from "lucide-react";
import { LogOut } from "lucide-react";
import { useUser } from "@/middleware/user";

const AppSidebar = () => {
  const { logout } = useUser();
  const role = window.localStorage.getItem("role");
  console.log(role);
  const setNavLinks = (role) => {
    if (role === "user") {
      return [
        { name: "Home", path: "/", icon: <Home className="text-[17px]" /> },
        {
          name: "Browse Books",
          path: "/books",
          icon: <Book className="text-[17px]" />,
        },
        {
          name: "My Borrowed",
          path: "/my-borrowed",
          icon: <ClipboardList className="text-[17px]" />,
        },
        {
          name: "Search",
          path: "/search",
          icon: <Search className="text-[17px]" />,
        },
        {
          name: "Categories",
          path: "/categories",
          icon: <Layers className="text-[17px]" />,
        },
        {
          name: "Wishlist",
          path: "/wishlist",
          icon: <Heart className="text-[17px]" />,
        },
        {
          name: "Profile",
          path: "/profile",
          icon: <User className="text-[17px]" />,
        },
        {
          name: "Support",
          path: "/support",
          icon: <Headset className="text-[17px]" />,
        },
      ];
    } else if (role === "admin") {
      return [
        {
          name: "Dashboard",
          path: "/admin/dashboard",
          icon: <LayoutDashboard className="text-[17px]" />,
        },
        {
          name: "Manage Books",
          path: "/admin/books",
          icon: <Book className="text-[17px]" />,
        },
        {
          name: "Manage Users",
          path: "/admin/users",
          icon: <Users className="text-[17px]" />,
        },
        {
          name: "Issued Books",
          path: "/admin/issued-books",
          icon: <ClipboardList className="text-[17px]" />,
        },
        {
          name: "Overdue Books",
          path: "/admin/overdue",
          icon: <List className="text-[17px]" />,
        },
        {
          name: "Categories",
          path: "/admin/categories",
          icon: <Layers className="text-[17px]" />,
        },
        {
          name: "Reports",
          path: "/admin/reports",
          icon: <FileBarChart2 className="text-[17px]" />,
        },
        {
          name: "Settings",
          path: "/admin/settings",
          icon: <Settings className="text-[17px]" />,
        },
      ];
    }
    return [];
  };
  const navLinks = setNavLinks(role);
  console.log(navLinks);
  return (
    <Sidebar>
      <SidebarHeader>
        <img className="w-[80%] ml-[10%] mt-10" src="/logo.png" alt="" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={"flex mt-10"}>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      "text-[16px] py-6 text-gray-600 hover:text-gray-900"
                    }
                  >
                    <a href={item.path}>
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton
          className={
            "text-[16px] py-6 text-red-500 hover:text-red-700 bg-gray-100 flex align-center justify-center items-center"
          }
          onClick={() => logout() + window.location.reload()}
        >
          <span>
            <LogOut />
          </span>
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
