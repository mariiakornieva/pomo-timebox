import * as _ from 'lodash';
import './style.css';

function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('text-red-700');

  return element;
}

document.body.appendChild(component());
