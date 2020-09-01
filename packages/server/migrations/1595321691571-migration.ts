import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1595321691571 implements MigrationInterface {
  name = 'migration1595321691571';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" ADD "googleId" character varying'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "googleId"');
  }
}
