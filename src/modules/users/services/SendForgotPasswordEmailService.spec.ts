import FakeMailProvider from "../../../shared/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import SendForgotPasswordEmailService from "./SendForgotEmailPasswordService";

describe('SendForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();
    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider)

    const sendMail = jest.spyOn(fakeMailProvider, "sendMail")

    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "1234"
    })

    await sendForgotPasswordEmailService.execute({ email: "johndoe@gmail.com"})

    expect(sendMail).toHaveBeenCalled();
  });

})
