import { Controller, Get, Logger } from '@nestjs/common';
import { BatchService } from './batch.service';
import { Cron, Timeout, CronExpression } from '@nestjs/schedule';
import { BATCH_ROLLBACK, BATCH_TOP_AGENTS, BATCH_TOP_PROPERTIES } from './lib/config';

@Controller()
export class BatchController {
  private logger = new Logger('BatchController');
  constructor(private readonly batchService: BatchService) {}

  @Timeout(1000)
  handleTimout() {
    this.logger.debug('TimeOuttest');
  }

  // Run every day at 03:00 KST (Asia/Seoul)
  @Cron(CronExpression.EVERY_DAY_AT_3AM, {
    name: BATCH_ROLLBACK,
    timeZone: 'Asia/Seoul',
  })
  public async batchRollback() {
    try {
      this.logger.debug('EXECUTED: batchRollback (daily 03:00 KST)');
      await this.batchService.batchRollback();
    } catch (err) {
      this.logger.error(err);
    }
  }

  // Stagger at 03:05 KST to avoid overlap
  @Cron('0 5 3 * * *', {
    name: BATCH_TOP_PROPERTIES,
    timeZone: 'Asia/Seoul',
  })
  public async batchTopProperties() {
    try {
      this.logger.debug('EXECUTED: batchTopProperties (daily 03:05 KST)');
      await this.batchService.batchTopProperties();
    } catch (err) {
      this.logger.error(err);
    }
  }

  // And 03:10 KST for agents
  @Cron('0 10 3 * * *', {
    name: BATCH_TOP_AGENTS,
    timeZone: 'Asia/Seoul',
  })
  public async batchTopAgents() {
    try {
      this.logger.debug('EXECUTED: batchTopAgents (daily 03:10 KST)');
      await this.batchService.batchTopAgents();
    } catch (err) {
      this.logger.error(err);
    }
  }

  @Get()
  getHello(): string {
    return this.batchService.getHello();
  }
}
