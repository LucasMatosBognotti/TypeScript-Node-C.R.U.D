import IMailProvider from '@shared/providers/MailProvider/models/IMailProvider';

interface IMassage {
  to: string;
  body: string;
}

class EtherealMailProvider implements IMailProvider {
  private messages: IMassage[] = [];

  public async sendMail(to: string, body: string): Promise<void> {
    this.messages.push({
      to,
      body,
    });
  }
}

export default EtherealMailProvider;
