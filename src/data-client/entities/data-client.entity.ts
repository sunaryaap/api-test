import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DataClient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  id_device: string;

  @Column("longtext")
  user_agent: string;

  @Column()
  remote_address: string;

  @Column("longtext")
  geolocation: string;
}