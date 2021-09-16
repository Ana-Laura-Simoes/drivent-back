import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePasswordRecoveryTable1631727769055 implements MigrationInterface {
    name = "CreatePasswordRecoveryTable1631727769055"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"passwordsRecovery\" (\"id\" SERIAL NOT NULL, \"email\" character varying NOT NULL, \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(), \"token\" character varying NOT NULL, CONSTRAINT \"PK_625830f4ed67eebe2b97ba3acd6\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"passwordsRecovery\"");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_74b92be5924b9fb1d808b4ffcd4\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
