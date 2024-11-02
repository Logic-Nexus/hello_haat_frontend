import { useState, useEffect } from "react";

const useTimeAgo = (dateString: string) => {
  const [timeAgo, setTimeAgo] = useState("");

  const calculateTimeAgo = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    let interval;

    if ((interval = Math.floor(seconds / 31536000)) >= 1) {
      return interval === 1 ? "1 year ago" : `${interval} years ago`;
    }
    if ((interval = Math.floor(seconds / 2592000)) >= 1) {
      return interval === 1 ? "1 month ago" : `${interval} months ago`;
    }
    if ((interval = Math.floor(seconds / 86400)) >= 1) {
      return interval === 1 ? "1 day ago" : `${interval} days ago`;
    }
    if ((interval = Math.floor(seconds / 3600)) >= 1) {
      return interval === 1 ? "1 hour ago" : `${interval} hours ago `;
    }
    if ((interval = Math.floor(seconds / 60)) >= 1) {
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
    }
    return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
  };

  useEffect(() => {
    if (!dateString) return;

    const date = new Date(dateString);
    const updateTimeAgo = () => {
      setTimeAgo(calculateTimeAgo(date));
    };

    updateTimeAgo(); // Initial calculation

    const interval = setInterval(updateTimeAgo, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on unmount
  }, [dateString]);

  return timeAgo;
};

export default useTimeAgo;
