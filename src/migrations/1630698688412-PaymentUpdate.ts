import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentUpdate1630698688412 implements MigrationInterface {
    name = "PaymentUpdate1630698688412"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"payment\" ADD \"hotel\" boolean NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"payment\" DROP COLUMN \"hotel\"");
    }
}
