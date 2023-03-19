import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export type Type = 'audio' | 'image';
export type Status = 'active' | 'inactive';

@Entity({ name: 'media' })
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ['audio', 'image'],
    default: 'image',
  })
  type: string;

  @Column()
  name: string;

  @Column({ nullable: false, name: 'title' })
  title: string;

  @Column({ nullable: false, name: 'description' })
  description: string;

  @Column({ nullable: false })
  url: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ['active', 'inactive'],
    default: 'active',
  })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ default: null })
  deletedAt: Date;
}
