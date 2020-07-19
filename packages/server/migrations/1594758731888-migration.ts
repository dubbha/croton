import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1594758731888 implements MigrationInterface {
    name = 'migration1594758731888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "email_verification" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "emailVerificationToken" character varying NOT NULL, "expiresIn" bigint NOT NULL, CONSTRAINT "PK_b985a8362d9dac51e3d6120d40e" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "health_check" ("id" SERIAL NOT NULL, CONSTRAINT "PK_bb6ae6b7bca4235bf4563eaeaad" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "password_reset" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, "passwordResetToken" character varying NOT NULL, "expiresIn" bigint NOT NULL, CONSTRAINT "PK_8515e60a2cc41584fa4784f52ce" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying NOT NULL, "facebookId" character varying, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user"');
        await queryRunner.query('DROP TABLE "password_reset"');
        await queryRunner.query('DROP TABLE "health_check"');
        await queryRunner.query('DROP TABLE "email_verification"');
    }

}
