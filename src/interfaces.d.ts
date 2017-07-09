


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

export interface IUserInfoFromServer {
  user_info: {
    access_token: string;
    auth_key: string;
    created: number;
    email: string;
    id: number;
    passwd: string;
    path_key: string;
    phone: string;
    status: number;
    type: string;
    updated: number;
    username: string;
  };
  pacient_info?: {
    birthString: string,
    birthUnix: number,
    district_code: string,
    male: number,
    parent?: IUserInfoFromServer,
    polis?: string,
    user_doctor_id?: number,
    user_id: number
  };
  doctor_info?: {
    license: number,
    user_id: number
  };
}
