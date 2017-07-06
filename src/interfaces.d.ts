


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
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  male?: '0' | '1' | string;  // 0 - female | 1 male
  district_name?: string;

  entity: IUserEntity;

  password?: string;
  promo?: string;
}
