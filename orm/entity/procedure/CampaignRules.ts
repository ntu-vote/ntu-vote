import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('campaign_rules', { schema: 'ntu_vote' })
export class CampaignRule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cprn_id' })
  cprn_id: number

  @Column('varchar', { name: 'verification_str', nullable: false, length: 64 })
  verificationStr: string

  @Column('smallint', {
    name: 'live',
    width: 1,
    nullable: false,
    default: () => "'0'",
  })
  live: boolean

  @Column('text', { name: 'description', nullable: false })
  description: string
}
