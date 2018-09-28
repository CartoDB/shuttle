import ejs  from 'ejs';
import panels from './panels.template.html';

export default function (panelsData) {
  return ejs.render(panels, { panels: panelsData });
}
