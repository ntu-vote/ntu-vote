// import DateTime from '../transformer/dateTime'
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

// @Entity('example', { schema: 'ntu_vote' })
// export class Example {
//   @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
//   id: number

//   @Column('varchar', { name: 'column1', nullable: true, length: 64 })
//   column1: string | null

//   @Column('smallint', {
//     name: 'column2',
//     width: 1,
//     nullable: false,
//     default: () => "'0'",
//   })
//   column2: boolean

//   @Column('text', { name: 'column3', nullable: true })
//   column3: string | null

//   @Column('timestamp', {
//     name: 'timestamp',
//     transformer: {
//       to: (value: Date) => value,
//       from: DateTime.formatTime,
//     },
//     nullable: true,
//     default: () => 'CURRENT_TIMESTAMP()',
//   })
//   timestamp: string
// }
