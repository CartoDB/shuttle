import ejs from 'ejs';

export default function generateLayout (visualizationData) {
  console.log(`./library/${visualizationData.library}.template.js`)
  const template = require(`./library/${visualizationData.library}.template.js`);

  return {
    library: visualizationData.library,
    code: ejs.render(template, visualizationData)
  };
}
