import ejs  from 'ejs';
import map from './map.template.html';

export default function (data) {
  return ejs.render(map, data);
}
