import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveJoinColumnWeekday1631132240504 implements MigrationInterface {
    name = "RemoveJoinColumnWeekday1631132240504"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"weekdays\" DROP CONSTRAINT \"FK_ab5f6fa5b0ee26d41886167ab0a\"");
      await queryRunner.query("ALTER TABLE \"weekdays\" DROP CONSTRAINT \"REL_ab5f6fa5b0ee26d41886167ab0\"");
      await queryRunner.query("ALTER TABLE \"weekdays\" DROP COLUMN \"dayId\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"weekdays\" ADD \"dayId\" integer");
      await queryRunner.query("ALTER TABLE \"weekdays\" ADD CONSTRAINT \"REL_ab5f6fa5b0ee26d41886167ab0\" UNIQUE (\"dayId\")");
      await queryRunner.query("ALTER TABLE \"weekdays\" ADD CONSTRAINT \"FK_ab5f6fa5b0ee26d41886167ab0a\" FOREIGN KEY (\"dayId\") REFERENCES \"days\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
