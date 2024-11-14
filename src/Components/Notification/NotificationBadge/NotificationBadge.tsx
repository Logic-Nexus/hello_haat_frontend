// NotificationBadge.jsx
import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import NotificationList from "../NotificationList/NotificationList";
import useSocket from "../../../Hook/useSocket/useSocket";

export default function NotificationBadge() {
  const socketContext = useSocket();
  const productPurchaseLiveResponse =
    socketContext?.productPurchaseLiveResponse;

  const [isOpen, setIsOpen] = useState(false);
  const closeDropdown = () => setIsOpen(false);

  const [notifications, setNotifications] = useState<any[]>([]);

  // Listen for new notifications
  useEffect(() => {
    if (productPurchaseLiveResponse?.title) {
      setNotifications((prev) => [productPurchaseLiveResponse, ...prev]);
    }
  }, [productPurchaseLiveResponse]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        onClick={notifications.length > 0 ? toggleDropdown : closeDropdown}
        className="relative flex items-center p-2 text-primary hover:text-primary/80"
      >
        <IoNotifications className="h-6 w-6" />
        {notifications?.length > 0 && (
          <span className="absolute -top-1 -right-1 rounded-full bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center">
            {notifications.length}
          </span>
        )}
      </button>
      {isOpen && (
        <NotificationList
          notifications={notifications}
          onClose={closeDropdown}
        />
      )}
    </div>
  );
}
