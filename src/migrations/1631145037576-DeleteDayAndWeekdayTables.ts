import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteDayAndWeekdayTables1631145037576 implements MigrationInterface {
    name = "DeleteDayAndWeekdayTables1631145037576"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_d979b0f143231b672251cfeeef0\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_d979b0f143231b672251cfeeef0\" FOREIGN KEY (\"dayId\") REFERENCES \"days\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
