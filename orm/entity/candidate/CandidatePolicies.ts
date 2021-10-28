import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CandidateInfo } from './CandidateInfo'

@Entity('candidate_policies', { schema: 'ntu_vote' })
export class CandidatePolicy {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cpid' })
  cpid: number

  @Column('varchar', { name: 'title', nullable: false, length: 256 })
  title: string

  @Column('text', { name: 'description', nullable: true })
  description: string | null

  @ManyToOne(() => CandidateInfo, (candidateInfo) => candidateInfo.policies, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'cid' })
  candidate: CandidateInfo
}
