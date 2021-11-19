import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Campaign } from './Campaigns'

@Entity('campaign_rules', { schema: 'ntu_vote' })
export class CampaignRule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cpnr_id' })
  cpnr_id: number

  @Column('varchar', { name: 'rule', nullable: false, length: 64 })
  rule: string

  @Column('smallint', {
    name: 'live',
    width: 1,
    nullable: false,
    default: () => "'0'",
  })
  live: boolean

  @Column('text', { name: 'description', nullable: false })
  description: string
  
  @OneToMany(() => Campaign, (campaign) => campaign.rule)
  campaigns: Campaign[]
}
