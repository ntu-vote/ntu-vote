import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateVoterTables1634872280814 implements MigrationInterface {
    name = 'CreateVoterTables1634872280814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_info" ("uid" SERIAL NOT NULL, "display_name" character varying(256) NOT NULL, "real_name" character varying(64) NOT NULL, "student_id" character varying(64) NOT NULL, CONSTRAINT "UQ_ae94898e0b76d82d47ad5aee9d2" UNIQUE ("student_id"), CONSTRAINT "PK_d8ae319ca37c4a81e4e2bd61963" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_private_keys" ("prv_id" SERIAL NOT NULL, "key" text NOT NULL, CONSTRAINT "PK_8093fcd779fe542acd155c10f16" PRIMARY KEY ("prv_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_public_keys" ("pub_id" SERIAL NOT NULL, "key" text NOT NULL, CONSTRAINT "PK_aa52cb837b527d2822ada434695" PRIMARY KEY ("pub_id"))`);
        await queryRunner.query(`CREATE TABLE "ntu_vote"."voter_accounts" ("username" character varying(64) NOT NULL, "password_hash" character varying(64) NOT NULL, "time_registered" TIMESTAMP DEFAULT now(), "infoUid" integer, "publicKeyPubId" integer, "privateKeyPrvId" integer, CONSTRAINT "REL_87f7443441df027553a767eb20" UNIQUE ("infoUid"), CONSTRAINT "REL_99e207caadf23cb27593cdcc4a" UNIQUE ("publicKeyPubId"), CONSTRAINT "REL_1bde2964d1e8f7729ced2c0ffa" UNIQUE ("privateKeyPrvId"), CONSTRAINT "PK_f7d77e7eb7b76ce7e6aa9f199cd" PRIMARY KEY ("username"))`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_87f7443441df027553a767eb201" FOREIGN KEY ("infoUid") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_99e207caadf23cb27593cdcc4a6" FOREIGN KEY ("publicKeyPubId") REFERENCES "ntu_vote"."voter_public_keys"("pub_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_1bde2964d1e8f7729ced2c0ffa8" FOREIGN KEY ("privateKeyPrvId") REFERENCES "ntu_vote"."voter_private_keys"("prv_id") ON DELETE RESTRICT ON UPDATE RESTRICT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_1bde2964d1e8f7729ced2c0ffa8"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_99e207caadf23cb27593cdcc4a6"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_87f7443441df027553a767eb201"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_accounts"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_public_keys"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_private_keys"`);
        await queryRunner.query(`DROP TABLE "ntu_vote"."voter_info"`);
    }

}
