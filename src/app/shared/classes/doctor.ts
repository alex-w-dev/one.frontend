import { IUserEntity } from '../../../interfaces';

export class Doctor implements IUserEntity {
  constructor(doctor) {
  }

  getLeftMenu() {
    return [
      {text: 'Мой профиль', link: '/account'},
      {text: 'Список клиентов', link: '/account'},
      {text: 'Рассписание', link: '/account'},
      {text: 'Сотрудничество c Biogenom', link: '/account'},
    ];
  }
}
