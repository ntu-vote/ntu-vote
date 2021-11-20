import {MigrationInterface, QueryRunner} from "typeorm";

export class fixVoteForeignKeyProblem1637291313415 implements MigrationInterface {
    name = 'fixVoteForeignKeyProblem1637291313415'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_89f7573ac640ff39bc99dfdfcc2"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "UQ_89f7573ac640ff39bc99dfdfcc2"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "REL_5f7dd26792dc32f0d77cc7d4ff"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_89f7573ac640ff39bc99dfdfcc2" FOREIGN KEY ("uid") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_89f7573ac640ff39bc99dfdfcc2"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "REL_5f7dd26792dc32f0d77cc7d4ff" UNIQUE ("cpn_id")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "UQ_89f7573ac640ff39bc99dfdfcc2" UNIQUE ("uid")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_89f7573ac640ff39bc99dfdfcc2" FOREIGN KEY ("uid") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
