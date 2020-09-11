import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1599297004961 implements MigrationInterface {
    name = 'migration1599297004961'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "mobile_verification" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "mobileVerificationToken" character varying NOT NULL, "expiresIn" bigint NOT NULL, CONSTRAINT "PK_8895545dc9d197be1444319ad19" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('DROP TABLE "mobile_verification"');
    }

}
