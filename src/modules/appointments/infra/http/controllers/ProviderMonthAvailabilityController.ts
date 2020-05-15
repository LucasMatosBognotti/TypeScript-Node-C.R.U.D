import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMouthAvailabilityService from '@modules/appointments/services/ListProviderMouthAvailabilityService';

class ProviderMonthAvailabilityController {
  public async index(req: Request, res: Response): Promise<Response> {
    const { provider_id } = req.params;
    const { month, year } = req.body;

    const listProviderMouthAvailability = container.resolve(ListProviderMouthAvailabilityService);

    const availability = await listProviderMouthAvailability.execute({
      provider_id,
      month,
      year,
    });

    return res.json(availability);
  }
}

export default ProviderMonthAvailabilityController;
