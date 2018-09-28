import Scaffoldings from './scaffolding';
import Partials from './partials';

function convertToTemplate (baseData) {
  const options = {};

  if (baseData.layout.toolbar) {
    options.toolbar = { position: baseData.layout.toolbar.position };
  }

  return {
    style: Partials.generateStyle(baseData.ui),
    layout: Partials.generateLayout(baseData.layout),
    visualization: Partials.generateVisualization(baseData.visualization),
    options
  };
}

// const baseData = {
//   ui: {
//     colors: {
//       primary: '#00FF00',
//       secondary: '#FABADA',
//       complementary: '#909090'
//     }
//   },
//   layout: {
//     toolbar: { position: 'left' },
//     sidebars: [
//       { position: 'left', size: 'l'},
//       { position: 'right', size: 'l'}
//     ],
//     panels: [
//       { horizontalPosition: 'top', verticalPosition: 'left'},
//       { horizontalPosition: 'top', verticalPosition: 'right'},
//       { horizontalPosition: 'bottom', verticalPosition: 'left'},
//       { horizontalPosition: 'bottom', verticalPosition: 'right'}
//     ],
//     footer: {}
//   },
//   visualization: {
//     library: 'cartovl',
//     data: {
//       apiKey: 'default_public',
//       username: 'roman-carto',
//       map: {
//         // bubbles, category, choropleth, gradient, flow
//         type: 'category',
//         geometry: 'polygon',
//         basemap: 'voyager',
//         extent: [-3.888962, 40.312064, -3.518051, 40.643271],
//         dataset: 'barrios',
//         column: 'nomdis',
//         columnType: 'string',
//         colorRamp: 'Bold'
//       }
//     }
//   }
// };


export default function (baseData) {
  // Create Vanilla scaffolding
  return Scaffoldings.vanilla(convertToTemplate(baseData));
  // generateBundle(fileDefinitions.files);
}
