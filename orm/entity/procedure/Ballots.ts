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

  @Column('text', { name: 'verification', nullable: true })
  verification: string

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
