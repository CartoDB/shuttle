const ejs = require('ejs');
const template = require('./sidebar.template.html');

const REQUIRED_PROPS = ['size', 'position'];

// Limitar props?
module.exports = function (data) {
  return ejs.render(template, data);
}
