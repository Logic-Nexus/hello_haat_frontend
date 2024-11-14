// NotificationList.jsx
import { MdClose } from "react-icons/md";

export default function NotificationList({
  notifications,
  onClose,
}: {
  notifications: any[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 sm:absolute sm:right-0 sm:inset-auto sm:bg-transparent sm:mt-2 sm:w-80">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden sm:w-80">
        {/* Header with Close Button */}
        <div className="flex justify-between items-center py-2 px-4 bg-gray-100 border-b border-gray-200">
          <span className="font-semibold text-gray-700">Notifications</span>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 sm:hidden"
          >
            <MdClose className="h-5 w-5" color="red" />
          </button>
        </div>
        {/* Notification Items */}
        <div className="md:max-h-screen max-h-96 overflow-y-auto">
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="border-b last:border-0 border-gray-200 p-4 hover:bg-gray-50"
            >
              <h4 className="text-sm font-semibold text-amber-600">
                {notification.title}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {notification.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
