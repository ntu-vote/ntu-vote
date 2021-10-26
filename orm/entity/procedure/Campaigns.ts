import DateTime from '../../transformer/dateTime'
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { CampaignRule } from './CampaignRules'
import { CandidateInfo } from '../candidate/CandidateInfo'

@Entity('campaigns', { schema: 'ntu_vote' })
export class Campaign {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cpn_id' })
  cpn_id: number

  @Column('varchar', { name: 'title', nullable: false, length: 256 })
  title: string

  @Column('text', { name: 'description', nullable: false })
  description: string

  @Column('varchar', { name: 'status', nullable: false, length: 16 })
  status: string

  @Column('timestamp', {
    name: 'start_time',
    transformer: {
      to: (value: Date) => value,
      from: DateTime.formatTime,
    },
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  startTime: string

  @Column('timestamp', {
    name: 'end_time',
    transformer: {
      to: (value: Date) => value,
      from: DateTime.formatTime,
    },
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  endTime: string | null

  @Column('varchar', { name: 'result', nullable: false, length: 64 })
  result: string

  @OneToOne(() => CampaignRule, {
    cascade: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'cpnr_id' })
  info: CampaignRule

  @OneToMany(() => CandidateInfo, (candidateInfo) => candidateInfo.cid)
  candidates: CandidateInfo[]
}
