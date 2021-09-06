import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOfUserAndPaymentTable1630942879114 implements MigrationInterface {
    name = "ChangeOfUserAndPaymentTable1630942879114"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users\" DROP COLUMN \"roomId\"");
      await queryRunner.query("ALTER TABLE \"hotels\" ADD \"image\" character varying NOT NULL");
      await queryRunner.query("ALTER TABLE \"payment\" ADD \"roomId\" integer");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"payment\" DROP COLUMN \"roomId\"");
      await queryRunner.query("ALTER TABLE \"hotels\" DROP COLUMN \"image\"");
      await queryRunner.query("ALTER TABLE \"users\" ADD \"roomId\" integer");
    }
}
