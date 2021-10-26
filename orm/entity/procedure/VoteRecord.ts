import DateTime from '../../transformer/dateTime'
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
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

  @OneToOne(() => VoterInfo, {
    cascade: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'voter_info' })
  voters: VoterInfo

  @OneToOne(() => Campaign, {
    cascade: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'cpn_id' })
  campaign: Campaign
}
