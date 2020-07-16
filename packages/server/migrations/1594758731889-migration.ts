import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1594758731889 implements MigrationInterface {
    name = 'migration1594758731889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "email_reset" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "emailResetToken" character varying NOT NULL, "expiresIn" bigint NOT NULL, CONSTRAINT "PK_c7cc1d8ec099867c393d29adafb" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "email_reset"');
    }

}
