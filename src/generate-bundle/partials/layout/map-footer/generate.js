import ejs  from 'ejs';
import footer from './footer.template.html';

export default function (data) {
  return ejs.render(footer, data);
}
