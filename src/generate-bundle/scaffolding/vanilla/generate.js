import ejs from 'ejs';

// Vanilla Template Files
import jsFile from './templates/app.template.js';
import htmlFile from './templates/index.template.html';

// Generate and export files with key: value
// Key is destination directory
// Value is file content
export default function (partials) {
  return {
    'src/app.js': ejs.render(jsFile, partials),
    'index.html': ejs.render(htmlFile, partials)
  };
}
