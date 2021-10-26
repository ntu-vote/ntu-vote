import {MigrationInterface, QueryRunner} from "typeorm";

export class createProcedureAndCandidateTables1635217713888 implements MigrationInterface {
    name = 'createProcedureAndCandidateTables1635217713888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ntu_vote"."campaign_rules" ("cprn_id" SERIAL NOT NULL, "verification_str" character varying(64) NOT NULL, "live" smallint NOT NULL DEFAULT '0', "description" text NOT NULL, CONSTRAINT "PK_eda881a2d14ac14e7008f29e3c4" PRIMARY KEY ("cprn_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."campaigns" ("cpn_id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "status" character varying(16) NOT NULL, "start_time" TIMESTAMP DEFAULT now(), "end_time" TIMESTAMP NOT NULL DEFAULT now(), "result" character varying(64) NOT NULL, "cpnr_id" integer, CONSTRAINT "REL_0255d03741c3de8b1bd4de0e58" UNIQUE ("cpnr_id"), CONSTRAINT "PK_9fddebbe06db96d0cdcb0c24b10" PRIMARY KEY ("cpn_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."ballots" ("bid" SERIAL NOT NULL, "verification_str" character varying(8) NOT NULL, "cpn_id" integer, "voter_info" integer, CONSTRAINT "REL_e77ad313bb4d8e2a489d480033" UNIQUE ("cpn_id"), CONSTRAINT "REL_3aca139d95655ca50f49b4c326" UNIQUE ("voter_info"), CONSTRAINT "PK_d6cfc8cfb5047de4d19385cba40" PRIMARY KEY ("bid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."vote_records" ("vr_id" SERIAL NOT NULL, "signed_msg" text NOT NULL, "voted_time" TIMESTAMP DEFAULT now(), "voter_info" integer, "cpn_id" integer, CONSTRAINT "REL_60b75aceac6baa03e14a21bca8" UNIQUE ("voter_info"), CONSTRAINT "REL_5f7dd26792dc32f0d77cc7d4ff" UNIQUE ("cpn_id"), CONSTRAINT "PK_83b46cac84afe5194a6d99f1876" PRIMARY KEY ("vr_id"))`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" DROP CONSTRAINT "PK_042cee7d87a9e1d25d0436e377c"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" DROP COLUMN "pid"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" ADD "cpid" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" ADD CONSTRAINT "PK_07eebe5652cdf228a3b279c2e9f" PRIMARY KEY ("cpid")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" ADD "title" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ADD CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587" FOREIGN KEY ("cpnr_id") REFERENCES "ntu_vote"."campaign_rules"("cprn_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_3aca139d95655ca50f49b4c326d" FOREIGN KEY ("voter_info") REFERENCES "ntu_vote"."candidate_info"("cid") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_60b75aceac6baa03e14a21bca84" FOREIGN KEY ("voter_info") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_60b75aceac6baa03e14a21bca84"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_3aca139d95655ca50f49b4c326d"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" DROP CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" DROP CONSTRAINT "PK_07eebe5652cdf228a3b279c2e9f"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" DROP COLUMN "cpid"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" ADD "name" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" ADD "pid" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" ADD CONSTRAINT "PK_042cee7d87a9e1d25d0436e377c" PRIMARY KEY ("pid")`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."vote_records"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."ballots"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."campaigns"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."campaign_rules"`);
    }

}
