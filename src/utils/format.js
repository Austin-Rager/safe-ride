const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// NHTSA recall dates come back as "DD/MM/YYYY". Turns them into "Oct 19, 2023".
export function formatRecallDate(dateString) {
  if (!dateString) return 'Unknown date';
  const [day, month, year] = dateString.split('/');
  const monthName = MONTHS[Number(month) - 1];
  if (!monthName) return dateString;
  return `${monthName} ${Number(day)}, ${year}`;
}

// Picks a photo for the vehicle. VehiclePicture is often missing,
// so fall back to the crash-test photos NHTSA provides.
export function getVehicleImage(ratings) {
  return (
    ratings.VehiclePicture ||
    ratings.FrontCrashPicture ||
    ratings.SideCrashPicture ||
    null
  );
}
