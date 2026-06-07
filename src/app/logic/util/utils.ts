import { Observable, map, distinctUntilChanged } from "rxjs";
import bcrypt from "bcryptjs";

// Hämta ett HTML-element via referens
export const node = (
  nodeId: string): HTMLElement => {
  return document
    .getElementById(nodeId)!;
}

// Spara data i localStorage
export const save = (
  key: string, 
  data: any): void => {
  const json = JSON
    .stringify(data);
  localStorage.setItem(
    key, json);
}

// Ladda data från localStorage
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

// Skapa ett Observer-objekt från det angivna Observer-objektets specifika datafält
export const extract$ = (
  from$: Observable<any>,
  prop: string,
  func: boolean = false) => {
  if(func) {
    return from$.pipe(map(
      item => item[prop]()), 
      distinctUntilChanged());
  } else {
    return from$.pipe(map(
    item => item[prop]), 
    distinctUntilChanged());
  }
}

// Sortera efter ett objektfält av den angivna listan
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

// Kryptera lösenordet
export const hashPass = (
  pass: string
  ): string | null => {
  try {
    return bcrypt
    .hashSync(pass, 10);
  } catch(err: any) {
    console.error(
      err.message);
    return null;
  }
}

// Kolla om det angivna lösenordet matchar det krypterade lösenordet
export const matchHash = (
  pass: string,
  hash: string
  ): boolean => {
  try {
    return bcrypt
      .compareSync(
        pass, hash);
  } catch(err: any) {
    console.error(
      err.message);
    return false;
  }
}


