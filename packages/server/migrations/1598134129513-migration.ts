import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1598134129513 implements MigrationInterface {
    name = 'migration1598134129513'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TYPE "notification_action_enum" AS ENUM(\'watering\', \'hydration\', \'fertilizing\')');
      await queryRunner.query('CREATE TABLE "notification" ("notificationId" SERIAL NOT NULL, "timestamp" bigint NOT NULL, "action" "notification_action_enum" NOT NULL, "flowerId" integer, CONSTRAINT "PK_34ecf236e96be76a41929c131b7" PRIMARY KEY ("notificationId"))');
      await queryRunner.query('CREATE TYPE "action_action_enum" AS ENUM(\'watering\', \'hydration\', \'fertilizing\')');
      await queryRunner.query('CREATE TABLE "action" ("actionId" SERIAL NOT NULL, "timestamp" bigint NOT NULL, "action" "action_action_enum" NOT NULL, "flowerId" integer, "userId" integer, CONSTRAINT "PK_34f3deb41f78c162c102ec797db" PRIMARY KEY ("actionId"))');
      await queryRunner.query('ALTER TABLE "notification" ADD CONSTRAINT "FK_79c5ab86814d0966d8e6d138d57" FOREIGN KEY ("flowerId") REFERENCES "flower"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "action" ADD CONSTRAINT "FK_a96be0237d050690126fdc925af" FOREIGN KEY ("flowerId") REFERENCES "flower"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "action" ADD CONSTRAINT "FK_b2e3f7568dafa9e86ae03910111" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "action" DROP CONSTRAINT "FK_b2e3f7568dafa9e86ae03910111"');
      await queryRunner.query('ALTER TABLE "action" DROP CONSTRAINT "FK_a96be0237d050690126fdc925af"');
      await queryRunner.query('ALTER TABLE "notification" DROP CONSTRAINT "FK_79c5ab86814d0966d8e6d138d57"');
      await queryRunner.query('DROP TABLE "action"');
      await queryRunner.query('DROP TYPE "action_action_enum"');
      await queryRunner.query('DROP TABLE "notification"');
      await queryRunner.query('DROP TYPE "notification_action_enum"');
    }

}
