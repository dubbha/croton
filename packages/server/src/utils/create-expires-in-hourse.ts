export function createExpiresInHours(hours: number): number {
  return 1000 * 60 * 60 * hours;
}