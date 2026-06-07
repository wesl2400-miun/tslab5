import { EffectI } from "../interface/EffectI";

// Modelklass för sorterings och filtreringseffekter
export class Effect 
  implements EffectI {
  
  constructor(
    public flag: string,
    public isOn: boolean = false) {
    this.flag = flag;
    this.isOn = isOn;
  }
}