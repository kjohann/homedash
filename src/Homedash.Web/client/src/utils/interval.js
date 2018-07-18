export const minutely = 60 * 1000;

export const quarterly = minutely * 15;

export const hourly = quarterly * 4;

export const create = (seconds) => seconds * 1000;

export default {
  minutely,
  quarterly,
  hourly,
  create
}