import ejs  from 'ejs';
import toolbar from './toolbar.template.html';

export default function (data) {
  return ejs.render(toolbar, data);
}
