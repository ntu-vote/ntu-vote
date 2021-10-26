import {MigrationInterface, QueryRunner} from "typeorm";

export class createVoterTables1635150613036 implements MigrationInterface {
    name = 'createVoterTables1635150613036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ntu_vote"."candidate_info" ("cid" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" text, CONSTRAINT "PK_0040de89fd3dd30b118e8814664" PRIMARY KEY ("cid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."candidate_policies" ("pid" SERIAL NOT NULL, "name" character varying(256) NOT NULL, "description" text, CONSTRAINT "PK_042cee7d87a9e1d25d0436e377c" PRIMARY KEY ("pid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_info" ("uid" SERIAL NOT NULL, "display_name" character varying(256) NOT NULL, "real_name" character varying(64) NOT NULL, "student_id" character varying(64) NOT NULL, CONSTRAINT "UQ_ae94898e0b76d82d47ad5aee9d2" UNIQUE ("student_id"), CONSTRAINT "PK_d8ae319ca37c4a81e4e2bd61963" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_private_keys" ("prv_id" SERIAL NOT NULL, "key" text NOT NULL, CONSTRAINT "PK_8093fcd779fe542acd155c10f16" PRIMARY KEY ("prv_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_public_keys" ("pub_id" SERIAL NOT NULL, "key" text NOT NULL, CONSTRAINT "PK_aa52cb837b527d2822ada434695" PRIMARY KEY ("pub_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_accounts" ("username" character varying(64) NOT NULL, "password_hash" character varying(64) NOT NULL, "time_registered" TIMESTAMP DEFAULT now(), "voter_info" integer, "voter_public_key" integer, "voter_private_key" integer, CONSTRAINT "REL_c554b88c1c8e92a996e68dbd33" UNIQUE ("voter_info"), CONSTRAINT "REL_bc2fcea83dce1db716feefdc17" UNIQUE ("voter_public_key"), CONSTRAINT "REL_a6a405b597444cb340ea6d18ee" UNIQUE ("voter_private_key"), CONSTRAINT "PK_f7d77e7eb7b76ce7e6aa9f199cd" PRIMARY KEY ("username"))`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_c554b88c1c8e92a996e68dbd336" FOREIGN KEY ("voter_info") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_bc2fcea83dce1db716feefdc172" FOREIGN KEY ("voter_public_key") REFERENCES "ntu_vote"."voter_public_keys"("pub_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_a6a405b597444cb340ea6d18ee8" FOREIGN KEY ("voter_private_key") REFERENCES "ntu_vote"."voter_private_keys"("prv_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_a6a405b597444cb340ea6d18ee8"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_bc2fcea83dce1db716feefdc172"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_c554b88c1c8e92a996e68dbd336"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_accounts"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_public_keys"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_private_keys"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_info"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."candidate_policies"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."candidate_info"`);
    }

}
