
export const node = (
  nodeId: string): HTMLElement => {
  return document
    .getElementById(nodeId)!;
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

// Kollar om en text innehåller ett angivet sökord
export const hasPhrase = (
  phrase: string, 
  search: string): boolean => {
  const text = phrase
    .toLowerCase();
  const keyword = search.
    toLowerCase();
  return text
    .includes(keyword);
}

export const loop = (process: 
  (index: number) => void, 
  stop: number): void => {
  for(let i = 0; i < stop; i++) {
    process(i);
  }
}
