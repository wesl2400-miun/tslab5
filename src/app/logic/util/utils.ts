
// Skriver ut felmeddelanden
export const onError = 
  (err: any): void => {
  console.error(err.message);
}

export const save = (
  key: string, 
  data: any): void => {
  const json = JSON
    .stringify(data);
  localStorage.setItem(
    key, json);
}

export const load = (
  key: string): any => {
  const json = localStorage
    .getItem(key);
  if(!json) return null;
  return JSON.parse(json);
}