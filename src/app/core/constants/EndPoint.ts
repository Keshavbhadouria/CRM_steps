import { environment } from "src/environments/environment";

export class EndPoint {

  // public static login: string = "";

  //#region Auth
  public static isTenantAvailable: string = this.getURL() + "/api/services/app/Account/IsTenantAvailable";
  public static login: string = this.getURL() + "/api/TokenAuth/Authenticate";

  //#endregion

  //#region Project

  //#endregion

  public static getURL(): string {
    return environment.apiURL;
  }
}

