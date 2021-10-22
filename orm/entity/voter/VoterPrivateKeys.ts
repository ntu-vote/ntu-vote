import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('voter_private_keys', { schema: 'ntu_vote' })
export class VoterPrivateKey {
  @PrimaryGeneratedColumn({ type: 'int', name: 'prv_id' })
  prvId: number

  @Column('text', { name: 'key', nullable: false })
  key: string
}
