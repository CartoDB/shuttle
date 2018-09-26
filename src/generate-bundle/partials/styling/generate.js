import ejs from 'ejs';

import generateCSSVariables from './css-variables/generate';

import style from './style.template.html';

export default function generateStyle (uiData) {
  const cssVariables = generateCSSVariables(uiData.colors);

  return ejs.render(style, {
    cssVariables
  });
}
