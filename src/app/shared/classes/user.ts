import { IUser, IUserInfoFromServer, IUserLeftMenuItem, IUserLogin } from '../../../interfaces';

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

  username = '';
  email = '';
  phone = '';
  birthDay = '1';
  birthMonth = 'Январь';
  birthYear = '1910';
  male = '1';
  avatar = '';
  id = '';
  password = '';

  promo = '';
  license = '';
  district_name = '';


  constructor(user?: IUserInfoFromServer) {
    if (user) {
      user.user_info.type.replace('pacient', 'patient');

      switch (this.type) {
        case 'patient':
          Object.assign(this, user.pacient_info);
          break;
        default:
          Object.assign(this, user.doctor_info);
      }

      Object.assign(this, user.user_info);

      /* check string values from server */
      let tempUser = new User();
      let self = this;
      Object.keys(tempUser).forEach(tempUserParameterName => {
        if (typeof tempUser[tempUserParameterName] === 'string') self[tempUserParameterName] = self[tempUserParameterName].toString();
      });

    }
  }

  getAvatarUrl(): string {
    if (this.avatar) return this.avatar;
    return this.isDoctor() ? '/public/img/doctor-main-avatar.png' : '/public/img/main-avatar.png';
  }

  getLeftMenu(): IUserLeftMenuItem[] {
    if (this.isDoctor()) {
      return [
        {text: 'Мой профиль', link: '/account'},
        {text: 'Список клиентов', link: '/client-list'},
        {text: 'Рассписание', link: '/schedule'},
        {text: 'Сотрудничество c Biogenom', link: '/cooperation'},
      ];
    }

    if (this.isPatient()) {
      return [
        {text: 'Мой профиль', link: '/account'},
        {text: 'Полный отчет по состоянию здоровья', link: '/site/stub/'},
        {text: 'Риски для здоровья', link: '/site/stub/'},
        {text: 'Медико-профилактические мероприятия', link: '/site/stub/'},
        {text: 'Комплексная индивидуальная программа', link: '/site/stub'},
        {text: 'История лечения', link: '/site/stub'},
        {text: 'Результаты анализов', link: '/site/stub'},
        {text: 'История покупок', link: '/site/stub/'},
        {text: 'Возврат 2-НДФЛ', link: '/site/stub/'},
        {text: 'Анкета', link: '/questionnaire'},
      ];
    }

    return [];
  }

  isPatient(): boolean {
    return this.type === 'patient';
  }

  isDoctor(): boolean {
    return this.type === 'doctor';
  }
}

export class UserLogin implements IUserLogin {
  username = '';

  constructor() {
  }
}
