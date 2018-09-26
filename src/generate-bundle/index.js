import Scaffoldings from './scaffolding';
import Partials from './partials';

function convertToTemplate (baseData) {
  return {
    // style: Partials.generateStyle(baseData.ui),
    layout: Partials.generateLayout(baseData.layout),
    visualization: Partials.generateVisualization(baseData.visualization)
  };
}

const baseData = {
  ui: {
    colors: {
      primary: '#1785FB',
      secondary: '#0F2D53',
      complementary: '#47DB99'
    }
  },
  layout: {
    toolbar: { position: 'top' },
    sidebars: [
      { position: 'left', size: 'l'},
      { position: 'right', size: 'xl'}
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
    library: 'cartovl'
  }
};

// Create Vanilla scaffolding
console.log(Scaffoldings.vanilla(convertToTemplate(baseData)))
