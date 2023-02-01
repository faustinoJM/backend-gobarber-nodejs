import IParseMailTemplateDTO from "../dtos/ParseMailTemplateDTO";

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>
}
