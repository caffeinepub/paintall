import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Stats {
    happyCustomers: bigint;
    yearsExperience: bigint;
    citiesServed: bigint;
    projectsCompleted: bigint;
}
export interface FAQ {
    question: string;
    answer: string;
}
export interface Booking {
    id: bigint;
    serviceType: string;
    city: string;
    name: string;
    message?: string;
    timestamp: bigint;
    phone: string;
}
export interface Project {
    title: string;
    description: string;
    category: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFAQ(question: string, answer: string): Promise<void>;
    addProject(title: string, category: string, description: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllBookings(): Promise<Array<Booking>>;
    getAllProjects(): Promise<Array<Project>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFAQs(): Promise<Array<FAQ>>;
    getStats(): Promise<Stats>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(name: string, phone: string, city: string, serviceType: string, message: string | null): Promise<bigint>;
}
