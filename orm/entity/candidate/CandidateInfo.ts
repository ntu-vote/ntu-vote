import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('candidate_info', { schema: 'ntu_vote' })
export class VoterAccount {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cid' })
  cid: number

  @Column('varchar', { name: 'candidate_name', nullable: false, length: 256 })
  candidate_name: string
}
