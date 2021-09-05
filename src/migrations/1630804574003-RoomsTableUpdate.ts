import { MigrationInterface, QueryRunner } from "typeorm";

export class RoomsTableUpdate1630804574003 implements MigrationInterface {
    name = "RoomsTableUpdate1630804574003"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" ADD \"type\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP COLUMN \"type\"");
    }
}
