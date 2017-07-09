import { IUserEntity } from '../../../interfaces';

export class Doctor implements IUserEntity {
  constructor(doctor) {
  }

  getLeftMenu() {
    return [
      {text: 'Мой профиль', link: '/account'},
      {text: 'Список клиентов', link: '/client-list'},
      {text: 'Рассписание', link: '/schedule'},
      {text: 'Сотрудничество c Biogenom', link: '/cooperation'},
    ];
  }
}
