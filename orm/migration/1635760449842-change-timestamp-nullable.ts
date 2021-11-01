import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTimestampNullable1635760449842 implements MigrationInterface {
    name = 'changeTimestampNullable1635760449842'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ALTER COLUMN "end_time" DROP NOT NULL`);
    }

}
