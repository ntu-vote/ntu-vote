import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Campaign } from './Campaigns'
import { CandidateInfo } from '../candidate/CandidateInfo'

@Entity('ballots', { schema: 'ntu_vote' })
export class Ballot {
  @PrimaryGeneratedColumn({ type: 'int', name: 'bid' })
  bid: number

  @Column('varchar', { name: 'verification_str', nullable: false, length: 8 })
  verificationStr: string

  @OneToOne(() => Campaign, {
    cascade: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'cpn_id' })
  campaign: Campaign

  @OneToOne(() => CandidateInfo, {
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'voter_info' })
  info: CandidateInfo
}
