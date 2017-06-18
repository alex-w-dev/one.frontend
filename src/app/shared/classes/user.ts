import { Patient } from './pacient';

export interface IUser {
  type: 'doctor' | 'patient';
  username: string;
  email: string;
  phone?: string;
  birthDay?: number;
  birthMonth?: string;
  birthYear?: number;
  male?: 0 | 1;
  district_name?: string;

  entity: Patient;

  password?: string;
  promo?: string;
}

export class User implements IUser {
  type: 'doctor' | 'patient' = 'patient';
  entity;
  username = '';
  email = '';
  phone = '';
  birthDay = 1;
  birthMonth = '';
  birthYear = 1910;
  male;

  constructor (user: IUser) {
    Object.assign(this, user);
  }
}
