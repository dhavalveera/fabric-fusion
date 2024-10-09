import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "adminRegistrations" })
export class AdminRegistrations {
  @PrimaryGeneratedColumn()
  adminRegistrationId: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ default: new Date() })
  createdAt: string;
}
