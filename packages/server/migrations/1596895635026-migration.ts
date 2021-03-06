import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1596895635026 implements MigrationInterface {
    name = 'migration1596895635026'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "shelf_invitation" ("id" SERIAL NOT NULL, "userEmail" character varying NOT NULL, "shelfInvitationToken" character varying NOT NULL, "expiresIn" bigint NOT NULL, "shelfId" integer, CONSTRAINT "PK_e8535df6ccb0725877131b92f1c" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "user_to_shelf" ("userToShelfId" SERIAL NOT NULL, "userId" integer NOT NULL, "shelfId" integer NOT NULL, "isAdmin" boolean NOT NULL, "order" integer NOT NULL, CONSTRAINT "PK_e4edee3cb6744c10efd90be9f18" PRIMARY KEY ("userToShelfId"))');
      await queryRunner.query('CREATE TABLE "shelf" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "location" character varying NOT NULL, "pictureUrl" character varying NOT NULL, CONSTRAINT "PK_da2ce57e38dfc635d50d0e5fc8f" PRIMARY KEY ("id"))');
      await queryRunner.query('CREATE TABLE "flower" ("id" SERIAL NOT NULL, "order" integer NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "pictureUrls" text NOT NULL, "rrules" text NOT NULL, "shelfId" integer, CONSTRAINT "PK_8d89826a15a9d5d16567c055637" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "email_reset" DROP COLUMN "userId"');
      await queryRunner.query('ALTER TABLE "email_reset" ADD "userId" integer NOT NULL');
      await queryRunner.query('ALTER TABLE "email_verification" DROP COLUMN "userId"');
      await queryRunner.query('ALTER TABLE "email_verification" ADD "userId" integer NOT NULL');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "status"');
      await queryRunner.query('CREATE TYPE "user_status_enum" AS ENUM(\'ACTIVE\', \'SUSPENDED\', \'PENDING_VERIFICATION\')');
      await queryRunner.query('ALTER TABLE "user" ADD "status" "user_status_enum" NOT NULL');
      await queryRunner.query('ALTER TABLE "password_reset" DROP COLUMN "userId"');
      await queryRunner.query('ALTER TABLE "password_reset" ADD "userId" integer NOT NULL');
      await queryRunner.query('ALTER TABLE "shelf_invitation" ADD CONSTRAINT "FK_9ff8b093346dfe9d2fe75949e69" FOREIGN KEY ("shelfId") REFERENCES "shelf"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "user_to_shelf" ADD CONSTRAINT "FK_432d008fac37c775f0f24d34f76" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "user_to_shelf" ADD CONSTRAINT "FK_8056561b03ef68dbbbddda6697b" FOREIGN KEY ("shelfId") REFERENCES "shelf"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
      await queryRunner.query('ALTER TABLE "flower" ADD CONSTRAINT "FK_ec2ae1c596b9a2b12cb7b8ae263" FOREIGN KEY ("shelfId") REFERENCES "shelf"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "flower" DROP CONSTRAINT "FK_ec2ae1c596b9a2b12cb7b8ae263"');
      await queryRunner.query('ALTER TABLE "user_to_shelf" DROP CONSTRAINT "FK_8056561b03ef68dbbbddda6697b"');
      await queryRunner.query('ALTER TABLE "user_to_shelf" DROP CONSTRAINT "FK_432d008fac37c775f0f24d34f76"');
      await queryRunner.query('ALTER TABLE "shelf_invitation" DROP CONSTRAINT "FK_9ff8b093346dfe9d2fe75949e69"');
      await queryRunner.query('ALTER TABLE "password_reset" DROP COLUMN "userId"');
      await queryRunner.query('ALTER TABLE "password_reset" ADD "userId" character varying NOT NULL');
      await queryRunner.query('ALTER TABLE "user" DROP COLUMN "status"');
      await queryRunner.query('DROP TYPE "user_status_enum"');
      await queryRunner.query('ALTER TABLE "user" ADD "status" character varying NOT NULL');
      await queryRunner.query('ALTER TABLE "email_verification" DROP COLUMN "userId"');
      await queryRunner.query('ALTER TABLE "email_verification" ADD "userId" character varying NOT NULL');
      await queryRunner.query('ALTER TABLE "email_reset" DROP COLUMN "userId"');
      await queryRunner.query('ALTER TABLE "email_reset" ADD "userId" character varying NOT NULL');
      await queryRunner.query('DROP TABLE "flower"');
      await queryRunner.query('DROP TABLE "shelf"');
      await queryRunner.query('DROP TABLE "user_to_shelf"');
      await queryRunner.query('DROP TABLE "shelf_invitation"');
    }

}
