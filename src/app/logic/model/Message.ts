import { MessageI } from "../interface/MessageI";
import { CSS_CLASS } from "../ref/cssClass";

// Modellklassen för popup-meddelanden
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