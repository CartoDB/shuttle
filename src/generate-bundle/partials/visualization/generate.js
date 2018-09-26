import ejs from 'ejs';

export default function generateLayout (visualizationData) {
  const template = require(`./library/${visualizationData.library}.template.js`)

  return {
    library: visualizationData.library,
    code: ejs.render(template, visualizationData)
  };
}
