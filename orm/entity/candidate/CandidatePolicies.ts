import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('candidate_policies', { schema: 'ntu_vote' })
export class CandidatePolicy {
  @PrimaryGeneratedColumn({ type: 'int', name: 'cpid' })
  cpid: number

  @Column('varchar', { name: 'title', nullable: false, length: 256 })
  title: string

  @Column('text', { name: 'description', nullable: true })
  description: string | null
}
