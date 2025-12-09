import { 
  User, 
  ShoppingBag, 
  MapPin, 
  Settings, 
  Heart, 
  CreditCard 
} from "lucide-react";
export const profileMenuItems = [
  {
    id: "profile",
    label: "My Profile",
    icon: User,
    path: "/profile#profile"
  },
  {
    id: "orders",
    label: "Order History",
    icon: ShoppingBag,
    path: "/profile#orders"
  },
  {
    id: "addresses",
    label: "Saved Addresses",
    icon: MapPin,
    path: "/profile#addresses"
  },
  {
    id: "settings",
    label: "Account Settings",
    icon: Settings,
    path: "/profile#settings"
  }
];
