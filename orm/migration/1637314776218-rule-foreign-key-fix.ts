import {MigrationInterface, QueryRunner} from "typeorm";

export class ruleForeignKeyFix1637314776218 implements MigrationInterface {
    name = 'ruleForeignKeyFix1637314776218'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" DROP CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" DROP CONSTRAINT "REL_0255d03741c3de8b1bd4de0e58"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ADD CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587" FOREIGN KEY ("cpnr_id") REFERENCES "ntu_vote"."campaign_rules"("cpnr_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" DROP CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ADD CONSTRAINT "REL_0255d03741c3de8b1bd4de0e58" UNIQUE ("cpnr_id")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ADD CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587" FOREIGN KEY ("cpnr_id") REFERENCES "ntu_vote"."campaign_rules"("cpnr_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
