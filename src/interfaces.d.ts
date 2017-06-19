


export interface IUserLeftMenuItem {
  text: string;
  link: string;
}

export interface IUserEntity {
  getLeftMenu(): IUserLeftMenuItem[];
}

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

  entity: IUserEntity;

  password?: string;
  promo?: string;
}
