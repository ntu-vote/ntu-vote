import {MigrationInterface, QueryRunner} from "typeorm";

export class campaignNullableFix1635496744579 implements MigrationInterface {
    name = 'campaignNullableFix1635496744579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaign_rules" RENAME COLUMN "cprn_id" TO "cpnr_id"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaign_rules" RENAME CONSTRAINT "PK_eda881a2d14ac14e7008f29e3c4" TO "PK_1dfd00f540dcee0b8ec20fd60b3"`);
        await queryRunner.query(`ALTER SEQUENCE "ntu_vote"."campaign_rules_cprn_id_seq" RENAME TO "campaign_rules_cpnr_id_seq"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "start_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "result" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "result" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "start_time" DROP NOT NULL`);
        await queryRunner.query(`ALTER SEQUENCE "ntu_vote"."campaign_rules_cpnr_id_seq" RENAME TO "campaign_rules_cprn_id_seq"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaign_rules" RENAME CONSTRAINT "PK_1dfd00f540dcee0b8ec20fd60b3" TO "PK_eda881a2d14ac14e7008f29e3c4"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaign_rules" RENAME COLUMN "cpnr_id" TO "cprn_id"`);
    }

}
