import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('voter_info', { schema: 'ntu_vote' })
export class VoterInfo {
  @PrimaryGeneratedColumn({ type: 'int', name: 'uid' })
  uid: number

  @Column('varchar', { name: 'display_name', nullable: false, length: 256 })
  displayName: string

  @Column('varchar', { name: 'real_name', nullable: false, length: 64 })
  realName: string

  @Column('varchar', {
    name: 'student_id',
    nullable: false,
    length: 64,
    unique: true,
  })
  studentId: string
}
