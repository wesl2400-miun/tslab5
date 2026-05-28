import { MessageI } from "../interface/MessageI";
import { CSS_CLASS } from "../ref/cssClass";

export class Message 
  implements MessageI {
  
  constructor(
    public content: string = '',
    public cssClass: string = 
      CSS_CLASS.DIAG_MSG) {
    this.content = content;
    this.cssClass = cssClass;
  }
}