import { getRepository } from 'typeorm';
import HealthCheckEntity from '../models/health-check.entity';
import HealthCheckException from '../exceptions/health-check.exception';

export default class HealthCheckService {
  private healthCheckRepository = getRepository(HealthCheckEntity);

  public async check(): Promise<string> {
    if (await this.healthCheckRepository.find()) {
      return 'Everything is OK!';
    } else {
      throw new HealthCheckException('Health check failed!');
    }
  }
}
