import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CandidatePolicy } from './CandidatePolicies'

@Entity('candidate_info', { schema: 'ntu_vote' })
export class CandidateInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cid' })
  cid: number

  @Column('varchar', { name: 'name', nullable: false, length: 256 })
  name: string

  @Column('text', { name: 'description', nullable: true })
  description: string | null

  @OneToMany(() => CandidatePolicy, (candidatePolicy) => candidatePolicy.cpid)
  candidatePolicies: CandidatePolicy[]
}
