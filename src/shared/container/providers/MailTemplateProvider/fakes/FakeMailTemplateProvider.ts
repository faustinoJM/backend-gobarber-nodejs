import ParseMailTemplateDTO from "../dtos/ParseMailTemplateDTO";
import IMailTemplateProvider from "../models/IMailTemplateProvider";

class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return "Mail content";
  }

}

export default FakeMailTemplateProvider;
