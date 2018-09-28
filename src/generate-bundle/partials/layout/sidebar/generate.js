const ejs = require('ejs');
const template = require('./sidebar.template.html');

module.exports = function (data) {
  return ejs.render(template, data);
}
