import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePaymentTable1630630131633 implements MigrationInterface {
    name = "CreatePaymentTable1630630131633"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"payment\" (\"id\" SERIAL NOT NULL, \"userName\" character varying NOT NULL, \"userId\" integer NOT NULL, \"userEmail\" character varying NOT NULL, \"price\" integer NOT NULL, \"type\" character varying NOT NULL, CONSTRAINT \"PK_fcaec7df5adf9cac408c686b2ab\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"payment\"");
    }
}
