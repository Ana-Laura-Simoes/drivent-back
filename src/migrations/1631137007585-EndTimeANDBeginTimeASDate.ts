import { MigrationInterface, QueryRunner } from "typeorm";

export class EndTimeANDBeginTimeASDate1631137007585 implements MigrationInterface {
    name = "EndTimeANDBeginTimeASDate1631137007585"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"beginTime\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"beginTime\" TIMESTAMP NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"endTime\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"endTime\" TIMESTAMP NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"endTime\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"endTime\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"beginTime\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"beginTime\" integer NOT NULL");
    }
}
