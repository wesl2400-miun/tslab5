import { UserI } from "../interface/UserI";
import { load, save } from "../util/utils";

export class Account {
  public user: UserI | null;
  
  constructor() {
    this.user = null;
  }

  public logged = 
    (): boolean => {
    return this.user 
      !== null;
  }

  public exists = (
    email: string
    ): boolean => {
    return this.tryLoad(
      email) !== null;
  }

  public login = (
    email: string,
    pass: string,
    ): boolean => {
    const user = 
      this.tryLoad(
        email);
    const match: boolean = 
      email === user?.email 
      && pass === user?.pass;
    if(match)
      this.user = user;
    return match;
  }

  public logout = 
    (): void => {
    this.user = null;
  }

  public create = (
    user: UserI
    ): boolean => {
    const { email } = user;
    const inStore = 
      this.tryLoad(
        email);
    if(inStore) 
      return false;
    this.trySave(user);
    this.user = user;
    return true;
  }

  private trySave = (
    user: UserI
    ): void => {
    try {
      const { email
        } = user;
      save(email, user);
    } catch(err: any) {
      console.error(
        err.message);
    }
  }

  private tryLoad = (
    email: string
    ): UserI | null => {
    try {
      const user = 
        load(email);
      return user;
    } catch(err: any) {
      console.error(
        err.message);
      return null;
    }
  }
}