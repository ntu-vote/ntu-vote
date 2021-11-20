import DateTime from '../../transformer/dateTime'
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { VoterInfo } from '../voter/VoterInfo'
import { Campaign } from './Campaigns'

@Entity('vote_records', { schema: 'ntu_vote' })
export class VoteRecord {
  @PrimaryGeneratedColumn({ type: 'int', name: 'vr_id' })
  vr_id: number

  @Column('text', { name: 'signed_msg', nullable: false })
  signed_msg: string

  @Column('timestamp', {
    name: 'voted_time',
    transformer: {
      to: (value: Date) => value,
      from: DateTime.formatTime,
    },
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  votedTime: string

  @ManyToOne(() => VoterInfo, (voterInfo) => voterInfo.voteRecords, {
    cascade: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'uid' })
  voter: VoterInfo

  @ManyToOne(() => Campaign, (campaign) => campaign.voteRecords, {
    cascade: false,
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'cpn_id' })
  campaign: Campaign
}
