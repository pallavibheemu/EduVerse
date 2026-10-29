
export const formatDate = (dateString) => {
  // Check if the date exists
  if (!dateString) {
    return "Date unavailable";
  }

  const date = new Date(dateString);

  // Check whether the date is valid
  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDatedAt  = date.toLocaleDateString("en-US", options);

  const hour = date.getHours();
  const minutes = date.getMinutes();

  const period = hour >= 12 ? "PM" : "AM";

  // Convert 24-hour time to 12-hour time
  const formattedHour = hour % 12 || 12;

  const formattedTime = `${formattedHour}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return `${formattedDatedAt } | ${formattedTime}`;
};

