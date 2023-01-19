export function getYearDiff(date1: Date, date2: Date): number {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}

export function getStricDate(value: string) {
  return new Date(value).toString() === "Invalid Date"
    ? new Date()
    : new Date(value);
}
