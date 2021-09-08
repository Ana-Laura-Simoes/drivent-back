import { MigrationInterface, QueryRunner } from "typeorm";

export class StringForDate21631133494199 implements MigrationInterface {
    name = "StringForDate21631133494199"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"days\" DROP COLUMN \"date\"");
      await queryRunner.query("ALTER TABLE \"days\" ADD \"date\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"days\" DROP COLUMN \"date\"");
      await queryRunner.query("ALTER TABLE \"days\" ADD \"date\" TIMESTAMP NOT NULL");
    }
}
