import {MigrationInterface, QueryRunner} from "typeorm";

export class ballotRelationFix1635761226274 implements MigrationInterface {
    name = 'ballotRelationFix1635761226274'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_1763b744539b08f460e26501d3e"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "REL_e77ad313bb4d8e2a489d480033"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "REL_1763b744539b08f460e26501d3"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_1763b744539b08f460e26501d3e" FOREIGN KEY ("cid") REFERENCES "ntu_vote"."candidate_info"("cid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_1763b744539b08f460e26501d3e"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "REL_1763b744539b08f460e26501d3" UNIQUE ("cid")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "REL_e77ad313bb4d8e2a489d480033" UNIQUE ("cpn_id")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_1763b744539b08f460e26501d3e" FOREIGN KEY ("cid") REFERENCES "ntu_vote"."candidate_info"("cid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
