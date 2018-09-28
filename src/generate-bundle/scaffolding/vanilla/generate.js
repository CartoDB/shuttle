import ejs from 'ejs';

import { js, html } from 'js-beautify';

// Vanilla Template Files
import jsFile from './templates/app.template.code';
import htmlFile from './templates/index.template.html';

import injectTemplate from './templates/inject.template.html'

// Library Imports
import airshipImports from './templates/import/airship.template.html';
import cartovlImports from './templates/import/cartovl.template.html';
import cartojsImports from './templates/import/cartojs.template.html';

// Generate and export files with key: value
// Key is destination directory
// Value is file content
export default function (data) {
  const libraries = {
    airship: airshipImports,
    'cartovl': cartovlImports,
    'cartojs': cartojsImports
  };

  const templateData = {
    libraries,
    ...data
  };

  return {
    files: {
      'src/app.js': js(ejs.render(jsFile, templateData), { "max_preserve_newlines": 2, "preserve_newlines": true }),
      'index.html': html(ejs.render(htmlFile, templateData), { "max_preserve_newlines": 2, "preserve_newlines": true })
    },
    inject: ejs.render(injectTemplate, templateData)
  };
}
