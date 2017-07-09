import { Patient } from './pacient';
import { IUser, IUserInfoFromServer, IUserLogin } from '../../../interfaces';
import { Doctor } from './doctor';

export class User implements IUser {
  type: 'doctor' | 'patient' = 'patient';
  entity;
  username = '';
  email = '';
  phone = '';
  birthDay = '1';
  birthMonth = 'Январь';
  birthYear = '1910';
  male = '1';

  constructor (user: IUserInfoFromServer) {
    user.user_info.type.replace('pacient', 'patient');
    Object.assign(this, user.user_info);

    console.log(this.type)

    switch (this.type) {
      case 'patient':
        this.entity = new Patient(user.pacient_info);
        break;
      default:
        this.entity = new Doctor(user.doctor_info);
    }
  }
}

export class UserRegister implements IUser {
  type: 'doctor' | 'patient' = 'patient';
  entity;
  username = '';
  email = '';
  phone = '';
  birthDay = '1';
  birthMonth = 'Январь';
  birthYear = '1910';
  male = '1';

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

export class UserLogin implements IUserLogin {
  email = '';

  constructor () {
  }
}
