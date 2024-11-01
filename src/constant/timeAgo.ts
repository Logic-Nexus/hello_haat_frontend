function timeAgo(dateString: string): string {
  const date = new Date(dateString); // Create a Date object from the string
  const now = new Date(); // Get the current date
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000); // Calculate the difference in seconds

  let interval: number; // Variable to hold interval values

  interval = Math.floor(seconds / 31536000); // seconds in a year
  if (interval >= 1) {
      return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }

  interval = Math.floor(seconds / 2592000); // seconds in a month
  if (interval >= 1) {
      return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }

  interval = Math.floor(seconds / 86400); // seconds in a day
  if (interval >= 1) {
      return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }

  interval = Math.floor(seconds / 3600); // seconds in an hour
  if (interval >= 1) {
      return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }

  interval = Math.floor(seconds / 60); // seconds in a minute
  if (interval >= 1) {
      return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }

  return seconds === 1 ? "1 second ago" : `${seconds} seconds ago`;
}

export default timeAgo;

