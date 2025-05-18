import React from "react";
import {
  Sidebar,
  SidebarContent,
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
import { Timer } from "lucide-react";
import { UserSquare } from "lucide-react";
import { ClipboardCheck } from "lucide-react";
import { TimerOff } from "lucide-react";
import { ClipboardEdit } from "lucide-react";
import { BookCopy } from "lucide-react";
import { Settings2 } from "lucide-react";
import { useEffect } from "react";
import { Info } from "lucide-react";
import { BadgeInfoIcon } from "lucide-react";
import { Upload } from "lucide-react";
import { UploadCloud } from "lucide-react";
import { Clipboard } from "lucide-react";
import { BellElectric } from "lucide-react";

const AppSidebar = () => {
  const { logout, user, fetchUser } = useUser();
  const role = window.localStorage.getItem("role");
  const location = window.location.pathname;
  const setNavLinks = (role) => {
    if (role === "user") {
      return [
        { name: "Home", path: "/", icon: <Home className="text-[17px] icon" /> },
        {
          name: "Update Profile",
          path: "/profile",
          icon: <Settings className="text-[17px] icon" />,
          ...(user?.avatar === "" || user?.avatar === null
            ? { infoIcon: <UploadCloud className="text-[17px] icon" /> }
            : {}), 
        },
        {
          name: "Notifications",
          path: "/notifications",
          icon: <BellElectric />
        },
        {
          name: "Borrowed Books",
          path: "/borrowed",
          icon: <Book className="text-[17px] icon" />,
          ...(user?.borrowedBooks?.length > 0 && {
            total: user.borrowedBooks.length,
          }),
        },
        {
          name: "Contact Librarian",
          path: "/support",
          icon: <Headset className="text-[17px] icon" />,
        },
      ];
    } else if (role === "admin") {
      return [
        {
          name: "Dashboard",
          path: "/",
          icon: <LayoutDashboard className="text-[17px] icon" />,
        },
        {
          name: "Manage Books",
          path: "/admin/books",
          icon: <Book className="text-[17px] icon" />,
        },
        {
          name: "Manage Users",
          path: "/admin/users",
          icon: <Users className="text-[17px] icon" />,
        },
        {
          name: "Issued Books",
          path: "/admin/issued-books",
          icon: <Clipboard className="text-[17px] icon" />,
        },
        
      
      ];
    }
    return [];
  };
  const navLinks = setNavLinks(role);

  return (
    <Sidebar className={"gap-4 icon"}>
      <SidebarHeader>
        <img className="w-[80%] ml-[10%] mt-10" src="/saus.jpeg" alt="" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className={"flex mt-10 gap-3"}>
              {navLinks.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={
                      "text-[16px] py-6 px-3 text-gray-600 hover:text-gray-900 rounded"
                    }
                    style={{
                      background:
                        item.path == location ? "#7c565b" : "",
                      color: item.path == location ? "white" : "",
                    }}
                  >
                    <a className="capitalize" href={item.path}>
                      <span className="icon">{item.icon}</span>
                      <span className="text-[15px]">{item.name}</span>
                      {item.total && (
                        <span className="w-8 h-8 flex items-center justify-center bg-gray-900 text-white  absolute text-[12px] rounded-2xl right-2">
                          {item?.total}
                        </span>
                      )}
                      {item.infoIcon && (
                        <span className="w-8 icon h-8 flex items-center justify-center text-black  absolute text-[12px] rounded-2xl right-2">
                          {item?.infoIcon}
                        </span>
                      )}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenuButton
          className={
            "text-[16px] rounded-xl py-6 bg-gray-900 text-white hover:bg-gray-800 hover:text-white  flex align-center justify-center items-center"
          }
          onClick={() => logout() + window.location.reload()}
        >
          <span className="uppercase font-semibold ">Logout</span>
        </SidebarMenuButton>
      </SidebarFooter> */}
    </Sidebar>
  );
};

export default AppSidebar;
