import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @ManyToOne(() => Campaign, (campaign) => campaign.ballots, {
    cascade: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cpn_id' })
  campaign: Campaign

  @ManyToOne(() => CandidateInfo, (candidateInfo) => candidateInfo.ballots, {
    cascade: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cid' })
  candidate: CandidateInfo
}
