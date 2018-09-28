import ejs  from 'ejs';
import cssVariables from './css-variables.template.html';

export default function (data) {
  return ejs.render(cssVariables, data);
}
