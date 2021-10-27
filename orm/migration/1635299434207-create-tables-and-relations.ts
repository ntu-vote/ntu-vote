import {MigrationInterface, QueryRunner} from "typeorm";

export class createTablesAndRelations1635299434207 implements MigrationInterface {
    name = 'createTablesAndRelations1635299434207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ntu_vote"."campaign_rules" ("cpnr_id" SERIAL NOT NULL, "verification_str" character varying(64) NOT NULL, "live" smallint NOT NULL DEFAULT '0', "description" text NOT NULL, CONSTRAINT "PK_eda881a2d14ac14e7008f29e3c4" PRIMARY KEY ("cpnr_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."campaigns" ("cpn_id" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "status" character varying(16) NOT NULL, "start_time" TIMESTAMP DEFAULT now(), "end_time" TIMESTAMP NOT NULL DEFAULT now(), "result" character varying(64) NOT NULL, "cpnr_id" integer, CONSTRAINT "REL_0255d03741c3de8b1bd4de0e58" UNIQUE ("cpnr_id"), CONSTRAINT "PK_9fddebbe06db96d0cdcb0c24b10" PRIMARY KEY ("cpn_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."candidate_policies" ("cpid" SERIAL NOT NULL, "title" character varying(256) NOT NULL, "description" text, "cid" integer, CONSTRAINT "PK_07eebe5652cdf228a3b279c2e9f" PRIMARY KEY ("cpid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."candidate_info" ("cid" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" text, "cpn_id" integer, CONSTRAINT "PK_0040de89fd3dd30b118e8814664" PRIMARY KEY ("cid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."ballots" ("bid" SERIAL NOT NULL, "verification_str" character varying(8) NOT NULL, "cpn_id" integer, "cid" integer, CONSTRAINT "REL_e77ad313bb4d8e2a489d480033" UNIQUE ("cpn_id"), CONSTRAINT "REL_1763b744539b08f460e26501d3" UNIQUE ("cid"), CONSTRAINT "PK_d6cfc8cfb5047de4d19385cba40" PRIMARY KEY ("bid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_info" ("uid" SERIAL NOT NULL, "display_name" character varying(256) NOT NULL, "real_name" character varying(64) NOT NULL, "student_id" character varying(64) NOT NULL, CONSTRAINT "UQ_ae94898e0b76d82d47ad5aee9d2" UNIQUE ("student_id"), CONSTRAINT "PK_d8ae319ca37c4a81e4e2bd61963" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."vote_records" ("vr_id" SERIAL NOT NULL, "signed_msg" text NOT NULL, "voted_time" TIMESTAMP DEFAULT now(), "voter_info" integer, "cpn_id" integer, CONSTRAINT "REL_60b75aceac6baa03e14a21bca8" UNIQUE ("voter_info"), CONSTRAINT "REL_5f7dd26792dc32f0d77cc7d4ff" UNIQUE ("cpn_id"), CONSTRAINT "PK_83b46cac84afe5194a6d99f1876" PRIMARY KEY ("vr_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_private_keys" ("prv_id" SERIAL NOT NULL, "key" text NOT NULL, CONSTRAINT "PK_8093fcd779fe542acd155c10f16" PRIMARY KEY ("prv_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_public_keys" ("pub_id" SERIAL NOT NULL, "key" text NOT NULL, CONSTRAINT "PK_aa52cb837b527d2822ada434695" PRIMARY KEY ("pub_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_accounts" ("username" character varying(64) NOT NULL, "password_hash" character varying(64) NOT NULL, "time_registered" TIMESTAMP DEFAULT now(), "voter_info" integer, "voter_public_key" integer, "voter_private_key" integer, CONSTRAINT "REL_c554b88c1c8e92a996e68dbd33" UNIQUE ("voter_info"), CONSTRAINT "REL_bc2fcea83dce1db716feefdc17" UNIQUE ("voter_public_key"), CONSTRAINT "REL_a6a405b597444cb340ea6d18ee" UNIQUE ("voter_private_key"), CONSTRAINT "PK_f7d77e7eb7b76ce7e6aa9f199cd" PRIMARY KEY ("username"))`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" ADD CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587" FOREIGN KEY ("cpnr_id") REFERENCES "ntu_vote"."campaign_rules"("cpnr_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" ADD CONSTRAINT "FK_7849dba5f2b18a27118119d63b8" FOREIGN KEY ("cid") REFERENCES "ntu_vote"."candidate_info"("cid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_info" ADD CONSTRAINT "FK_b623a3a7daf74a65e5337343e4b" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" ADD CONSTRAINT "FK_1763b744539b08f460e26501d3e" FOREIGN KEY ("cid") REFERENCES "ntu_vote"."candidate_info"("cid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_60b75aceac6baa03e14a21bca84" FOREIGN KEY ("voter_info") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9" FOREIGN KEY ("cpn_id") REFERENCES "ntu_vote"."campaigns"("cpn_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_c554b88c1c8e92a996e68dbd336" FOREIGN KEY ("voter_info") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_bc2fcea83dce1db716feefdc172" FOREIGN KEY ("voter_public_key") REFERENCES "ntu_vote"."voter_public_keys"("pub_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_a6a405b597444cb340ea6d18ee8" FOREIGN KEY ("voter_private_key") REFERENCES "ntu_vote"."voter_private_keys"("prv_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_a6a405b597444cb340ea6d18ee8"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_bc2fcea83dce1db716feefdc172"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_c554b88c1c8e92a996e68dbd336"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_5f7dd26792dc32f0d77cc7d4ff9"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_60b75aceac6baa03e14a21bca84"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_1763b744539b08f460e26501d3e"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."ballots" DROP CONSTRAINT "FK_e77ad313bb4d8e2a489d480033c"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_info" DROP CONSTRAINT "FK_b623a3a7daf74a65e5337343e4b"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."candidate_policies" DROP CONSTRAINT "FK_7849dba5f2b18a27118119d63b8"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaigns" DROP CONSTRAINT "FK_0255d03741c3de8b1bd4de0e587"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_accounts"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_public_keys"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_private_keys"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."vote_records"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_info"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."ballots"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."candidate_info"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."candidate_policies"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."campaigns"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."campaign_rules"`);
    }

}
