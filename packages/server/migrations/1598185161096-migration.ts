import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1598185161096 implements MigrationInterface {
    name = 'migration1598185161096'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "notification_token" ("notificationTokenId" SERIAL NOT NULL, "registrationToken" character varying NOT NULL, "registrationTokenLastUpdate" bigint NOT NULL, "userId" integer, CONSTRAINT "PK_0f2eb7b2bd5f4cdeef1b2aae625" PRIMARY KEY ("notificationTokenId"))');
      await queryRunner.query('ALTER TABLE "notification_token" ADD CONSTRAINT "FK_8c1dede7ba7256bff4e6155093c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "notification_token" DROP CONSTRAINT "FK_8c1dede7ba7256bff4e6155093c"');
      await queryRunner.query('DROP TABLE "notification_token"');
    }

}
