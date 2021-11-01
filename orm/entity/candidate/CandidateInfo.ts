import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Ballot } from '../procedure/Ballots'
import { Campaign } from '../procedure/Campaigns'
import { CandidatePolicy } from './CandidatePolicies'

@Entity('candidate_info', { schema: 'ntu_vote' })
export class CandidateInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cid' })
  cid: number

  @Column('varchar', { name: 'name', nullable: false, length: 256 })
  name: string

  @Column('text', { name: 'description', nullable: true })
  description: string | null

  @OneToMany(
    () => CandidatePolicy,
    (candidatePolicy) => candidatePolicy.candidate
  )
  policies: CandidatePolicy[]

  @ManyToOne(() => Campaign, (campaign) => campaign.candidates, {
    cascade: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cpn_id' })
  campaign: Campaign

  @OneToMany(() => Ballot, (ballot) => ballot.candidate)
  ballots: Ballot[]
}
