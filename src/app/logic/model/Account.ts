import { UserI } from "../interface/UserI";
import { hashPass, load, matchHash, save } from "../util/utils";

export class Account {

  public exists = (
    email: string
    ): boolean => {
    return this.tryLoad(
      email) !== null;
  }

  public login = async(
    email: string,
    pass: string,
    ): Promise<UserI | null> => {
    const user = 
      this.tryLoad(
        email);
    const match: boolean = 
      await matchHash(pass, 
        user?.pass || '');
    if(match) return user;
    return null;
  }

  public create = async (
    user: UserI
    ): Promise<UserI | null> => {
    const { email } = user;
    const inStore = 
      this.tryLoad(
        email);
    if(inStore) 
      return null;
    await this.trySave(user);
    return user;
  }

  private trySave = async (
    user: UserI
    ): Promise<void> => {
    try {
      const { email,
        pass } = user;
      const hash = 
        await hashPass(pass);
      if(hash) {
        user.pass = hash;
        save(email, user);
      }
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