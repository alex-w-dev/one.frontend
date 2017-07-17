import { IUser, IUserInfoFromServer, IUserLeftMenuItem, IUserLogin } from '../../../interfaces';
import { HelpersService } from '../services/helpers.service';

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
  avatarSmall = '';
  id = '';
  password = '';

  promo = '';
  license = '';
  district_name = '';


  constructor(user?: IUserInfoFromServer) {
    if (user) {
      user.user_info.type.replace('pacient', 'patient');

      this.avatar = HelpersService.deepFind(user, 'avatar.big') || '';
      this.avatarSmall = HelpersService.deepFind(user, 'avatar.min') || '';

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
    if (this.avatar) return `http://api.biogenom.ru/${this.avatar}`;
    return this.isDoctor() ? '/public/img/doctor-main-avatar.png' : '/public/img/main-avatar.png';
  }

  getAvatarSmallUrl(): string {
    if (this.avatarSmall) return `http://api.biogenom.ru/${this.avatarSmall}`;
    return this.isDoctor() ? '/public/img/top-avatar.png' : '/public/img/top-avatar.png';
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
