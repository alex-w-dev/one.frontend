import { Patient } from './pacient';
import { IUser } from '../../../interfaces';
import { Doctor } from './doctor';

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

    switch (this.type) {
      case 'patient':
        this.entity = new Patient({});
        break;
      default:
        this.entity = new Doctor({});
    }
  }
}
