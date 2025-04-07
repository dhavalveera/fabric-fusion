import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

// ENUM
import { Role } from "../constants";

@Entity({ name: "otpVerification" })
export class AuthOtpModel {
  @PrimaryGeneratedColumn("uuid")
  otpVerificationId: string;

  // The email OTP is associated with `Admin` or `User`
  @Column({ type: "varchar", length: 255, unique: true, nullable: false })
  email: string;

  //   6-digit OTP
  @Column({ type: "varchar", length: 6, unique: true, nullable: false })
  otp: string;

  // Whether this OTP has been verified
  @Column({ default: false, type: "boolean" })
  isVerified: boolean;

  // Timestamp when OTP was created
  @CreateDateColumn()
  createdAt: Date;

  // Timestamp when OTP will expire (e.g., 10 minutes after creation)
  @Column()
  expiresAt: Date;

  // Optional: Store user role (User | Admin) for clarity
  @Column({ enum: Role, nullable: true, type: "enum" })
  role: Role;
}
