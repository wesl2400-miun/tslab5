import { DialogI } from "../interface/DialogI";

export const DIALOG: Readonly<DialogI> = {
  COURSES_FAIL: 'Det gick inte att hämta kurser',
  ADD_CRS_FAIL: 'Det gick inte att lägga till kursen',
  REM_CRS_FAIL: 'Det gick inte att ta bort kursen',
  ADD_CRS_SUCCESS: 'Kursen har lagts till ramschemat',
  REM_CRS_SUCCESS: 'Kursen har tagits bort',
  LOGIN_FAILURE: 'E-post eller lösenord stämmer inte',
  REG_FAILURE: 'Det gick inte att skapa kontot',
  REG_DUPLICATE: 'Det finns redan ett konto kopplat till denna e-post'
}