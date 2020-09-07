import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1599305430325 implements MigrationInterface {
    name = 'migration1599305430325'

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('CREATE TABLE "image" ("id" SERIAL NOT NULL, "image" character varying NOT NULL, "flowerId" integer, CONSTRAINT "PK_d6db1ab4ee9ad9dbe86c64e4cc3" PRIMARY KEY ("id"))');
      await queryRunner.query('ALTER TABLE "flower" DROP COLUMN "pictureUrls"');
      await queryRunner.query('ALTER TABLE "image" ADD CONSTRAINT "FK_c991106a2894201723002b8a29f" FOREIGN KEY ("flowerId") REFERENCES "flower"("id") ON DELETE CASCADE ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query('ALTER TABLE "image" DROP CONSTRAINT "FK_c991106a2894201723002b8a29f"');
      await queryRunner.query('ALTER TABLE "flower" ADD "pictureUrls" text NOT NULL');
      await queryRunner.query('DROP TABLE "image"');
    }

}
