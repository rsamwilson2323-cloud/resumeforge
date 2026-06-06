import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface Resume {
    contact: ContactInfo;
    education: Array<Education>;
    workExperience: Array<WorkExperience>;
    summary: string;
    updatedAt: Timestamp;
    skills: Array<string>;
}
export interface ContactInfo {
    linkedin: string;
    name: string;
    email: string;
    phone: string;
    location: string;
}
export interface WorkExperience {
    title: string;
    endDate: string;
    description: string;
    company: string;
    location: string;
    startDate: string;
}
export interface Education {
    field: string;
    endDate: string;
    institution: string;
    degree: string;
    startDate: string;
}
export interface backendInterface {
    loadResume(): Promise<Resume | null>;
    saveResume(resume: Resume): Promise<void>;
}
