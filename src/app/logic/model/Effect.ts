import { EffectI } from "../interface/EffectI";

export class Effect 
  implements EffectI {
  
  constructor(
    public flag: string,
    public isOn: boolean = false) {
    this.flag = flag;
    this.isOn = isOn;
  }
}