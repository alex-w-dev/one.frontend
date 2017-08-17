import { IUser, IUserInfoFromServer, IUserLeftMenuItem, IUserLogin } from '../../../interfaces';
import { HelpersService } from '../services/helpers.service';

export class User implements IUser {
  typeValue = 'patient';
  get type() {
    return this.typeValue;
  }
  set type(type) {
    if (type === 'pacient' as any) {
      type = 'patient';
    }
    this.typeValue = type;
  }

  name = '';
  surname = '';
  patronymic = '';
  email = '';
  phone = '';
  birthDay = '01';
  birthMonth = '01';
  birthYear = '1910';
  male = '1';
  avatar = '';
  avatarSmall = '';
  id = '';
  password = '';

  promo = '';
  license = '';
  district_code = '';

  private locationProtocol: string;


  constructor(user?: IUserInfoFromServer) {
    this.locationProtocol = window.location.protocol;

    if (user) {
      this.type = user.user_info.type;

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
        if (
          tempUser &&
          self &&
          typeof self[tempUserParameterName] === 'number' &&
          typeof tempUser[tempUserParameterName] === 'string'
        ) {
          self[tempUserParameterName] = self[tempUserParameterName].toString();
        }

        if (self[tempUserParameterName] === 'null' || self[tempUserParameterName] === 'false') self[tempUserParameterName] = '';
      });

    }
  }

  getAvatarUrl(): string {
    if (this.avatar) return `${this.locationProtocol}//api.biogenom.ru/${this.avatar}`;
    switch (this.type) {
      case 'doctor':
      case 'partner':
        return '/public/img/doctor-main-avatar.png';
      default:
        return '/public/img/main-avatar.png';
    }
  }

  getAvatarSmallUrl(): string {
    if (this.avatarSmall) return `${this.locationProtocol}//api.biogenom.ru/${this.avatarSmall}`;
    switch (this.type) {
      case 'doctor':
      case 'partner':
        return '/public/img/doctor-main-avatar.png';
      default:
        return '/public/img/main-avatar.png';
    }
  }

  getFio(user: IUser = this): string {
    return `${user.surname || ''} ${user.name || ''} ${user.patronymic || ''}`;
  }

  getLeftMenu(): IUserLeftMenuItem[] {
    if (this.isDoctor()) {
      return [
        {text: 'Мой профиль', link: '/account'},
        {text: 'Список клиентов', link: '/client-list'},
        {text: 'Расписание', link: '/schedule'},
        {text: 'Сотрудничество c Biogenom', link: '/cooperation'},
      ];
    }

    if (this.isPartner()) {
      return [
        {text: 'Мой профиль', link: '/account'},
        {text: 'Заполнить анализы', link: '/questionnaire'},
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

  isPartner(): boolean {
    return this.type === 'partner';
  }
}

export class UserLogin implements IUserLogin {
  email = '';

  constructor() {
  }
}
