import {MigrationInterface, QueryRunner} from "typeorm";

export class createVerificationText1637228214729 implements MigrationInterface {
    name = 'createVerificationText1637228214729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" RENAME COLUMN "verification_str" TO "verification"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP COLUMN "verification"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD "verification" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP COLUMN "verification"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD "verification" character varying(8)`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" RENAME COLUMN "verification" TO "verification_str"`);
    }

}
