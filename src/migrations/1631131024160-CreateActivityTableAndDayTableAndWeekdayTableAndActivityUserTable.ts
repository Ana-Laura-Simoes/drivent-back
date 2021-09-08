import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateActivityTableAndDayTableAndWeekdayTableAndActivityUserTable1631131024160 implements MigrationInterface {
    name = "CreateActivityTableAndDayTableAndWeekdayTableAndActivityUserTable1631131024160"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"activitiesUsers\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"activityId\" integer NOT NULL, CONSTRAINT \"PK_214ca190c9b6f0190914240c47f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"weekdays\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"dayId\" integer, CONSTRAINT \"REL_ab5f6fa5b0ee26d41886167ab0\" UNIQUE (\"dayId\"), CONSTRAINT \"PK_ff746550a4920cf6773b53177e4\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"days\" (\"id\" SERIAL NOT NULL, \"weekdayId\" integer NOT NULL, \"date\" TIMESTAMP NOT NULL, CONSTRAINT \"PK_c2c66eb46534bea34ba48cc4d7f\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"description\" character varying NOT NULL, \"maxInscriptions\" integer NOT NULL, \"inscriptions\" integer NOT NULL, \"beginTime\" integer NOT NULL, \"endTime\" integer NOT NULL, \"dayId\" integer NOT NULL, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" ADD CONSTRAINT \"FK_6a961861d183d919ddaf648b6f4\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" ADD CONSTRAINT \"FK_73bbb98e63729202fb95d386399\" FOREIGN KEY (\"activityId\") REFERENCES \"activities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"weekdays\" ADD CONSTRAINT \"FK_ab5f6fa5b0ee26d41886167ab0a\" FOREIGN KEY (\"dayId\") REFERENCES \"days\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_d979b0f143231b672251cfeeef0\" FOREIGN KEY (\"dayId\") REFERENCES \"days\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_d979b0f143231b672251cfeeef0\"");
      await queryRunner.query("ALTER TABLE \"weekdays\" DROP CONSTRAINT \"FK_ab5f6fa5b0ee26d41886167ab0a\"");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" DROP CONSTRAINT \"FK_73bbb98e63729202fb95d386399\"");
      await queryRunner.query("ALTER TABLE \"activitiesUsers\" DROP CONSTRAINT \"FK_6a961861d183d919ddaf648b6f4\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"days\"");
      await queryRunner.query("DROP TABLE \"weekdays\"");
      await queryRunner.query("DROP TABLE \"activitiesUsers\"");
    }
}
