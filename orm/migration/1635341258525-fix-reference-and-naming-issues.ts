import {MigrationInterface, QueryRunner} from "typeorm";

export class fixReferenceAndNamingIssues1635341258525 implements MigrationInterface {
    name = 'fixReferenceAndNamingIssues1635341258525'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_60b75aceac6baa03e14a21bca84"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_c554b88c1c8e92a996e68dbd336"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_bc2fcea83dce1db716feefdc172"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_a6a405b597444cb340ea6d18ee8"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaign_rules" RENAME COLUMN "verification_str" TO "rule"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" RENAME COLUMN "voter_info" TO "uid"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" RENAME CONSTRAINT "REL_60b75aceac6baa03e14a21bca8" TO "UQ_89f7573ac640ff39bc99dfdfcc2"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "REL_c554b88c1c8e92a996e68dbd33"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP COLUMN "voter_info"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "REL_bc2fcea83dce1db716feefdc17"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP COLUMN "voter_public_key"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "REL_a6a405b597444cb340ea6d18ee"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP COLUMN "voter_private_key"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD "uid" integer`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "UQ_cb84e4a45e0c21691c19d9541de" UNIQUE ("uid")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD "pub_id" integer`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "UQ_21c92f3a64cc3005bf128442261" UNIQUE ("pub_id")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD "prv_id" integer`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "UQ_972cda54362c9c3a177313c28ce" UNIQUE ("prv_id")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" DROP CONSTRAINT "UQ_ae94898e0b76d82d47ad5aee9d2"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" ADD "student_id" character varying(9) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" ADD CONSTRAINT "UQ_ae94898e0b76d82d47ad5aee9d2" UNIQUE ("student_id")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_89f7573ac640ff39bc99dfdfcc2" FOREIGN KEY ("uid") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_cb84e4a45e0c21691c19d9541de" FOREIGN KEY ("uid") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_21c92f3a64cc3005bf128442261" FOREIGN KEY ("pub_id") REFERENCES "ntu_vote"."voter_public_keys"("pub_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_972cda54362c9c3a177313c28ce" FOREIGN KEY ("prv_id") REFERENCES "ntu_vote"."voter_private_keys"("prv_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_972cda54362c9c3a177313c28ce"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_21c92f3a64cc3005bf128442261"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "FK_cb84e4a45e0c21691c19d9541de"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" DROP CONSTRAINT "FK_89f7573ac640ff39bc99dfdfcc2"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" DROP CONSTRAINT "UQ_ae94898e0b76d82d47ad5aee9d2"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" DROP COLUMN "student_id"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" ADD "student_id" character varying(64) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_info" ADD CONSTRAINT "UQ_ae94898e0b76d82d47ad5aee9d2" UNIQUE ("student_id")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "UQ_972cda54362c9c3a177313c28ce"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP COLUMN "prv_id"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "UQ_21c92f3a64cc3005bf128442261"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP COLUMN "pub_id"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP CONSTRAINT "UQ_cb84e4a45e0c21691c19d9541de"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" DROP COLUMN "uid"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD "voter_private_key" integer`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "REL_a6a405b597444cb340ea6d18ee" UNIQUE ("voter_private_key")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD "voter_public_key" integer`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "REL_bc2fcea83dce1db716feefdc17" UNIQUE ("voter_public_key")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD "voter_info" integer`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "REL_c554b88c1c8e92a996e68dbd33" UNIQUE ("voter_info")`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" RENAME CONSTRAINT "UQ_89f7573ac640ff39bc99dfdfcc2" TO "REL_60b75aceac6baa03e14a21bca8"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" RENAME COLUMN "uid" TO "voter_info"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."campaign_rules" RENAME COLUMN "rule" TO "verification_str"`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_a6a405b597444cb340ea6d18ee8" FOREIGN KEY ("voter_private_key") REFERENCES "ntu_vote"."voter_private_keys"("prv_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_bc2fcea83dce1db716feefdc172" FOREIGN KEY ("voter_public_key") REFERENCES "ntu_vote"."voter_public_keys"("pub_id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."voter_accounts" ADD CONSTRAINT "FK_c554b88c1c8e92a996e68dbd336" FOREIGN KEY ("voter_info") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ntu_vote"."vote_records" ADD CONSTRAINT "FK_60b75aceac6baa03e14a21bca84" FOREIGN KEY ("voter_info") REFERENCES "ntu_vote"."voter_info"("uid") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

}
