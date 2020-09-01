import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1596240000000 implements MigrationInterface {
    name = 'migration1596240000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "googleId"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "user" ADD "googleId" character varying');
    }
}
