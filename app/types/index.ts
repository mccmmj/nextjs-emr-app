// User types
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  DOCTOR = 'DOCTOR',
  NURSE = 'NURSE',
  RECEPTIONIST = 'RECEPTIONIST',
  BILLING = 'BILLING',
}

// Patient types
export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email?: string;
  phone?: string;
  address?: Address;
  insuranceInfo?: InsuranceInfo;
  medicalHistory?: MedicalHistory;
  createdAt: string;
  updatedAt: string;
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface InsuranceInfo {
  provider: string;
  policyNumber: string;
  groupNumber?: string;
  primaryInsured?: string;
  relationshipToPrimary?: string;
  expirationDate?: string;
}

export interface MedicalHistory {
  allergies: string[];
  medications: Medication[];
  conditions: Condition[];
  surgeries: Surgery[];
  familyHistory: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}

export interface Condition {
  name: string;
  diagnosedDate: string;
  notes?: string;
}

export interface Surgery {
  procedure: string;
  date: string;
  notes?: string;
}

// Appointment types
export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number; // in minutes
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum AppointmentType {
  CHECKUP = 'CHECKUP',
  FOLLOWUP = 'FOLLOWUP',
  CONSULTATION = 'CONSULTATION',
  PROCEDURE = 'PROCEDURE',
  EMERGENCY = 'EMERGENCY',
}

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  NOSHOW = 'NOSHOW',
}

// Document types
export interface Document {
  id: string;
  patientId: string;
  authorId: string;
  title: string;
  content: string;
  type: DocumentType;
  createdAt: string;
  updatedAt: string;
}

export enum DocumentType {
  CLINICAL_NOTE = 'CLINICAL_NOTE',
  LAB_RESULT = 'LAB_RESULT',
  PRESCRIPTION = 'PRESCRIPTION',
  REFERRAL = 'REFERRAL',
  DISCHARGE_SUMMARY = 'DISCHARGE_SUMMARY',
  OTHER = 'OTHER',
}

// Billing types
export interface Claim {
  id: string;
  patientId: string;
  providerId: string;
  serviceDate: string;
  submissionDate: string;
  status: ClaimStatus;
  amount: number;
  insuranceInfo: InsuranceInfo;
  services: Service[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export enum ClaimStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DENIED = 'DENIED',
  PAID = 'PAID',
}

export interface Service {
  code: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
} 