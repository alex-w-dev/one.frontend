import { Patient } from './pacient';
import { IUser, IUserInfoFromServer, IUserLogin } from '../../../interfaces';
import { Doctor } from './doctor';

export class User implements IUser {
  typeValue: 'doctor' | 'patient' = 'patient';
  get type() {
    return this.typeValue;
  }
  set type(type) {
    if (type === 'pacient' as any) {
      type = 'patient';
    }
    this.typeValue = type;
  }

  entity;
  username = '';
  email = '';
  phone = '';
  birthDay = '1';
  birthMonth = 'Январь';
  birthYear = '1910';
  male = '1';
  avatar = '';

  constructor(user: IUserInfoFromServer) {
    user.user_info.type.replace('pacient', 'patient');
    Object.assign(this, user.user_info);

    switch (this.type) {
      case 'patient':
        this.entity = new Patient(user.pacient_info);
        break;
      default:
        this.entity = new Doctor(user.doctor_info);
    }
  }

  getAvatarUrl(): string {
    if (this.avatar) return this.avatar;
    return this.isDoctor() ? '/public/img/doctor-main-avatar.png' : '/public/img/main-avatar.png';
  }

  isPatient(): boolean {
    return this.type === 'patient';
  }

  isDoctor(): boolean {
    return this.type === 'doctor';
  }
}

export class UserRegister implements IUser {
  type: 'doctor' | 'patient' = 'patient';
  entity;
  username = '';
  email = '';
  phone = '';
  district_name = '';
  promo = '';
  password = '';
  birthDay = '1';
  birthMonth = 'Январь';
  birthYear = '1910';
  male = '1';

  constructor(user: IUser) {
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
  username = '';

  constructor() {
  }
}
