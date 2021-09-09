import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteDayAndWeekdayTables31631145403348 implements MigrationInterface {
    name = "DeleteDayAndWeekdayTables31631145403348"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"dayId\"");
      await queryRunner.query("DROP TABLE \"days\"");
      await queryRunner.query("DROP TABLE \"weekdays\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"dayId\" integer NOT NULL");
    }
}
