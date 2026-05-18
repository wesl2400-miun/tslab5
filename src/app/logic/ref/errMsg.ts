import { ErrMsgI } from "../interface/ErrMsgI";

export const ERR_MSG: Readonly<ErrMsgI> = {
  DUPLICATE: 'Kurs med samma kod finns redan i ditt ramschema',
  SAVE_FAIL: 'Kunde inte spara kursen',
  LOAD_FAIL: 'Kunde inte ladda kurserna',
  NETWORK_FAIL: 'Problem med nätverk'
}