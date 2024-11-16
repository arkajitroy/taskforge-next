import { SettingsIcon, UsersIcon } from "lucide-react";
import { GoCheckCircleFill, GoCircle, GoHome, GoHomeFill } from "react-icons/go";

export const SidebarNavigationItems = [
  {
    label: "Home",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Task",
    href: "/tasks",
    icon: GoCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "/members",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];
