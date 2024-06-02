
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface IQuery {
    getUser(id: string): User | Promise<User>;
}

export interface User {
    createdAt: Date;
    email: string;
    financialSummary: UserFinancialSummary;
    firstName: string;
    id: string;
    lastName: string;
    phoneNumber?: Nullable<string>;
    updatedAt: Date;
}

export interface UserFinancialSummary {
    amountInCentsSpentLastThirtyDays: number;
    id: string;
}

type Nullable<T> = T | null;
