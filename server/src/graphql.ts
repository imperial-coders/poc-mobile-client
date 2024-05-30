
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
    firstName: string;
    id: string;
    lastName: string;
    phoneNumber?: Nullable<string>;
    updatedAt: Date;
}

type Nullable<T> = T | null;
