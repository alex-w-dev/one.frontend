


export interface IUserLeftMenuItem {
  text: string;
  link: string;
}

export interface IUser {
  type: 'doctor' | 'patient';
  id?: string;
  username: string;
  email: string;
  phone?: string;
  birthDay?: string;
  birthMonth?: string;
  birthYear?: string;
  male?: '0' | '1' | string;  // 0 - female | 1 male
  district_name?: string;
  license?: string;

  password?: string;
  promo?: string;
  approved?: string;

  avatar?: string;
  avatarSmall?: string;

  isDoctor?(): boolean;
  isPatient?(): boolean;
  getLeftMenu?(): IUserLeftMenuItem[];
  getAvatarUrl?(): string;
  getAvatarSmallUrl?(): string;
}

export interface IUserLogin {
  username: string;
  password?: string;
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
  avatar?: {
    big: string,
    min: string,
  };
}


interface DialogParams {
  text?: string;
  title?: string;
  promptValue?: string;
  okBtnText?: string;
  cancelBtnText?: string;
}

interface INotice {
  id: string;
  read: number | string;
  type: 'doctor_pacient_connect' | string;
  time: string;
  extra_data: {
    doctor_id?: string,
    pacient_id?: string,
  };

}

interface DialogComponentParams extends DialogParams {
  mode: 'alert' | 'confirm' | 'prompt';
}
