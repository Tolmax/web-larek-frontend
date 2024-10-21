import './scss/styles.scss';
import { AppController } from './components/app.controller'

const appController = new AppController();

// export const cardTemplate: HTMLTemplateElement = document.querySelector('card-catalog');
// console.log(cardTemplate)
// export const testCard = document.querySelector('.gallery');
// console.log(testCard)

appController.init();
