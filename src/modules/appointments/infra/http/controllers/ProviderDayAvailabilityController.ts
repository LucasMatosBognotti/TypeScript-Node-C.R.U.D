import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const {
      day, month, year,
    } = req.body;

    const listproviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listproviderDayAvailability.execute({
      provider_id,
      day,
      month,
      year,
    });

    return res.json(availability);
  }
}

export default ProviderDayAvailabilityController;
