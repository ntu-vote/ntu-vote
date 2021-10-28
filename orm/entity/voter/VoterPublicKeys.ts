import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('voter_public_keys', { schema: 'ntu_vote' })
export class VoterPublicKey {
  @PrimaryGeneratedColumn({ type: 'int', name: 'pub_id' })
  pubId: number

  @Column('text', { name: 'key', nullable: false })
  key: string
}
