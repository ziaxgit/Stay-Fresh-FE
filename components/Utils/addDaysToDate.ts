export default function addDaysToDate(numberOfDaysToAdd: number) {
  const currentDate = new Date();
  // currentDate.setDate(currentDate.getDate() + days);

  // // Format the date as "dd/mm/yyyy"
  // const formattedDate = currentDate.toLocaleDateString("en-GB");
  const newDate = new Date(currentDate);
  newDate.setDate(currentDate.getDate() + numberOfDaysToAdd);

  return newDate;
}
