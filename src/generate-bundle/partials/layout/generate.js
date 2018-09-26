import ejs from 'ejs';

import generateToolbar from './toolbar/generate';
import generateSidebar from './sidebar/generate';
// import generateMap from './map';
// import generateMapPanels from './map-panels';
// import generateMapFooter from './map-footer';

import layout from './layout.template.html';

export default function generateLayout (layoutData) {
  const toolbar = generateToolbar(layoutData);
  const sidebars = layoutData.sidebars.map(generateSidebar);
  // const map = generateMap(data);
  // const panels = generateMapPanels(data);
  // const footer = generateMapFooter(data);

  return ejs.render(layout, {
    toolbar,
    sidebars,
    // map,
    // panels,
    // footer
  });
}
