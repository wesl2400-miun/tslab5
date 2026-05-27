import { Observable, map, distinctUntilChanged } from "rxjs";
import bcrypt from "bcryptjs";

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
  text: string, 
  phrase: string): boolean => {
  const org = text
    .toLowerCase();
  const keyword = phrase.
    toLowerCase();
  return org.includes(
    keyword);
}

export const extract$ = (
  from$: Observable<any>,
  prop: string,
  func: boolean = false) => {
  if(func) {
    return from$.pipe(map(
      item => item[prop]()));
  } else {
    return from$.pipe(map(
    item => item[prop]), 
    distinctUntilChanged());
  }
}

export const sort = (
  prop: string, list: any) => {
  const compare = 
    (a: any, b: any): number => {
      if(a[prop] > b[prop]) 
          return 1;
      else if(a[prop] < b[prop])
        return -1;
      return 0;
  }
  return list.sort(compare);
}

export const hashPass = async (
  pass: string
  ): Promise<string | null> => {
  try {
    return await bcrypt
    .hash(pass, 10);
  } catch(err: any) {
    console.error(
      err.message);
    return null;
  }
}

export const matchHash = async (
  pass: string,
  hash: string
  ): Promise<boolean> => {
  try {
    return await bcrypt
      .compare(pass, hash);
  } catch(err: any) {
    console.error(
      err.message);
    return false;
  }
}


