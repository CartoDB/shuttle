import ejs from 'ejs';

// Vanilla Template Files
import jsFile from './templates/app.template.code';
import htmlFile from './templates/index.template.html';

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
    'src/app.js': ejs.render(jsFile, templateData),
    'index.html': ejs.render(htmlFile, templateData)
  };
}
