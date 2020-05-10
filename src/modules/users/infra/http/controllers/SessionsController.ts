import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAutheticateService from '@modules/users/services/CreateAutheticateService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(CreateAutheticateService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return res.json({ user, token });
  }
}

export default SessionsController;
