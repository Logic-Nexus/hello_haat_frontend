const getFormetedDate = (date: any) => {
  const day = date.getDate().toString().padStart(2, "0"); // Get day and pad with leading zero if necessary
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (add 1 because months are 0-based) and pad with leading zero if necessary
  const year = date.getFullYear();

  const formattedDate = `${year}/${month}/${day}`;

  return formattedDate;
};

export default getFormetedDate;
