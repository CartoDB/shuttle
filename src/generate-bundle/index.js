import Scaffoldings from './scaffolding';
import Partials from './partials';
import { generateBundle } from './bundle';

function convertToTemplate (baseData) {
  return {
    style: Partials.generateStyle(baseData.ui),
    layout: Partials.generateLayout(baseData.layout),
    visualization: Partials.generateVisualization(baseData.visualization),
    options: {
      toolbar: { position: baseData.layout.toolbar.position }
    }
  };
}

const baseData = {
  ui: {
    colors: {
      primary: '#00FF00',
      secondary: '#FABADA',
      complementary: '#909090'
    }
  },
  layout: {
    toolbar: { position: 'left' },
    sidebars: [
      { position: 'left', size: 'l'},
      { position: 'right', size: 'l'}
    ],
    panels: [
      { horizontalPosition: 'top', verticalPosition: 'left'},
      { horizontalPosition: 'top', verticalPosition: 'right'},
      { horizontalPosition: 'bottom', verticalPosition: 'left'},
      { horizontalPosition: 'bottom', verticalPosition: 'right'}
    ],
    footer: {}
  },
  visualization: {
    library: 'cartojs',
    data: {
      apiKey: 'default_public',
      username: 'cartojs-test',
      map: {
        // bubbles, categories, choropleth, gradient, flows
        type: 'gradient',
        geometry: 'line',
        basemap: 'voyager',
        dataset: 'datasetdeprueba',
        column: 'columnadeprueba',
        colorRamp: 'rampadeprueba'
      }
    }
  }
};

// Create Vanilla scaffolding
const fileDefinitions = Scaffoldings.vanilla(convertToTemplate(baseData));
// generateBundle(fileDefinitions);
console.log(fileDefinitions)
