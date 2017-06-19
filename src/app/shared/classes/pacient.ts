import { IUserEntity } from '../../../interfaces';

export class Patient implements IUserEntity {
  constructor(patient) {
  }

  getLeftMenu() {
    return [
      {text: 'Мой профиль', link: '/account'},
      {text: 'Полный отчет по состоянию здоровья', link: '/site/stub/'},
      {text: 'Риски для здоровья', link: '/site/stub/'},
      {text: 'Медико-профилактические мероприятия', link: '/site/stub/'},
      {text: 'Комплексная индивидуальная программа', link: '/site/stub'},
      {text: 'История лечения', link: '/site/stub?'},
      {text: 'Результаты анализов', link: '/site/stub?'},
      {text: 'История покупок', link: '/site/stub/'},
      {text: 'Возврат 2-НДФЛ', link: '/site/stub/'},
      {text: 'Анкета', link: '/questionnaire'},
    ];
  }
}
