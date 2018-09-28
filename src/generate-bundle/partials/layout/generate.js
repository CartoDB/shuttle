import ejs from 'ejs';

import generateToolbar from './toolbar/generate';
import generateSidebar from './sidebar/generate';
import generateMap from './map/generate';
import generatePanels from './map-panels/generate';
import generateMapFooter from './map-footer/generate';

import layout from './layout.template.html';

export default function generateLayout (layoutData) {
  const toolbar = layoutData.toolbar ? generateToolbar(layoutData.toolbar) : '';
  const sidebars = layoutData.sidebars && layoutData.sidebars.length ? layoutData.sidebars.map(generateSidebar) : [];
  const map = generateMap(layoutData.map);
  const panels = layoutData.panels && layoutData.panels.length ? generatePanels(layoutData.panels) : [];
  const footer = layoutData.footer ? generateMapFooter(layoutData.footer) : '';

  return ejs.render(layout, {
    toolbar,
    sidebars,
    map,
    panels,
    footer
  });
}
