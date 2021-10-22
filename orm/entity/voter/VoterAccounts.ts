import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import DateTime from '../../transformer/dateTime'
import { VoterInfo } from './VoterInfo'
import { VoterPrivateKey } from './VoterPrivateKeys'
import { VoterPublicKey } from './VoterPublicKeys'

@Entity('voter_accounts', { schema: 'ntu_vote' })
export class VoterAccount {
  @PrimaryColumn('varchar', { name: 'username', length: 64 })
  username: string

  @Column('varchar', { name: 'password_hash', nullable: false, length: 64 })
  passwordHash: string

  @Column('timestamp', {
    name: 'time_registered',
    transformer: {
      to: (value: Date) => value,
      from: DateTime.formatTime,
    },
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP()',
  })
  timeRegistered: string

  @OneToOne(() => VoterInfo, {
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  info: VoterInfo

  @OneToOne(() => VoterPublicKey, {
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  publicKey: VoterPublicKey

  @OneToOne(() => VoterPrivateKey, {
    cascade: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn()
  privateKey: VoterPrivateKey
}
