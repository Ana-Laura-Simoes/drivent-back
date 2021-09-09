import { MigrationInterface, QueryRunner } from "typeorm";

export class LocationTable1631161213613 implements MigrationInterface {
    name = "LocationTable1631161213613"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"locations\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, CONSTRAINT \"PK_7cc1c9e3853b94816c094825e74\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activities\" ADD \"locationId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_74b92be5924b9fb1d808b4ffcd4\" FOREIGN KEY (\"locationId\") REFERENCES \"locations\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_74b92be5924b9fb1d808b4ffcd4\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP COLUMN \"locationId\"");
      await queryRunner.query("DROP TABLE \"locations\"");
    }
}
