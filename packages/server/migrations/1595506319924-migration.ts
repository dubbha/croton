import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1595506319924 implements MigrationInterface {
  name = 'migration1595506319924';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" RENAME COLUMN "facebookId" TO "socialProfileId"'
    );
    await queryRunner.query(
      'CREATE TABLE "social_profile" ("id" SERIAL NOT NULL, "pictureUrl" character varying NOT NULL, "facebookId" character varying, "googleId" character varying, CONSTRAINT "PK_50727a3d0f93a9069ddbe8e6d97" PRIMARY KEY ("id"))'
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "socialProfileId"');
    await queryRunner.query('ALTER TABLE "user" ADD "socialProfileId" integer');
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "UQ_68bebd1e3b78ed0912c677b0307" UNIQUE ("socialProfileId")'
    );
    await queryRunner.query(
      'ALTER TABLE "user" ADD CONSTRAINT "FK_68bebd1e3b78ed0912c677b0307" FOREIGN KEY ("socialProfileId") REFERENCES "social_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT "FK_68bebd1e3b78ed0912c677b0307"'
    );
    await queryRunner.query(
      'ALTER TABLE "user" DROP CONSTRAINT "UQ_68bebd1e3b78ed0912c677b0307"'
    );
    await queryRunner.query('ALTER TABLE "user" DROP COLUMN "socialProfileId"');
    await queryRunner.query(
      'ALTER TABLE "user" ADD "socialProfileId" character varying'
    );
    await queryRunner.query('DROP TABLE "social_profile"');
    await queryRunner.query(
      'ALTER TABLE "user" RENAME COLUMN "socialProfileId" TO "facebookId"'
    );
  }
}
