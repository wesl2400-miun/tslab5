import { UserI } from "../interface/UserI";
import { load, save } from "../util/utils";

export class Account {

  public exists = (
    email: string
    ): boolean => {
    return this.tryLoad(
      email) !== null;
  }

  public login = (
    email: string,
    pass: string,
    ): UserI | null => {
    const user = 
      this.tryLoad(
        email);
    const match: boolean = 
      email === user?.email 
      && pass === user?.pass;
    if(match) return user;
    return null;
  }

  public create = (
    user: UserI
    ): UserI | null => {
    const { email } = user;
    const inStore = 
      this.tryLoad(
        email);
    if(inStore) 
      return null;
    this.trySave(user);
    return user;
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
      return load(email);
    } catch(err: any) {
      console.error(
        err.message);
      return null;
    }
  }
}