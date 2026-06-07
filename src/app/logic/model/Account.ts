import { UserI } from "../interface/UserI";
import { hashPass, load, matchHash, save } from "../util/utils";

// Hanterar konto-logik
export class Account {

  // Kolla om en dubblett finns
  public exists = (
    email: string
    ): boolean => {
    return this.tryLoad(
      email) !== null;
  }

  // Returnera null eller användadata vid inloggning
  public login = (
    email: string,
    pass: string,
    ): UserI | null => {
    const user = 
      this.tryLoad(email);
    const match: boolean = 
      matchHash(pass, 
        user?.pass || '');
    if(match) return user;
    else return null;
  }

  // skapa konto
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

  // Försök spara kontot i localStorage
  private trySave = (
    user: UserI
    ): void => {
    try {
      const { email,
        pass } = user;
      const hash = 
        hashPass(pass);
      if(hash) {
        user.pass = hash;
        save(email, user);
      }
    } catch(err: any) {
      console.error(
        err.message);
    }
  }

  // Försök ladda kontot från localStorage
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