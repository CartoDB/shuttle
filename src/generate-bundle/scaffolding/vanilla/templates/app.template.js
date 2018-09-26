const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  center: [0, 30],
  zoom: 2,
  scrollZoom: false,
  dragRotate: false,
  touchZoomRotate: false
});

const nav = new mapboxgl.NavigationControl({
  showCompass: false
});

map.addControl(nav, 'top-left');

// Define user
carto.setDefaultAuth({
  user: 'cartovl',
  apiKey: 'default_public'
});

// Define layer
const source = new carto.source.Dataset('ne_10m_populated_places_simple');
const viz = new carto.Viz(`
  @cities: viewportFeatures($pop_max, $name, $cartodb_id),
`);
const layer = new carto.Layer('layer', source, viz);

layer.addTo(map, 'watername_ocean');

const $categoryWidget = document.querySelector('#cities-widget');
layer.on('updated', updateWidgets);

function updateWidgets() {
  $categoryWidget.categories = viz.variables.cities.value
    .map(feature => ({
      name: feature.name,
      value: feature.pop_max,
      select: () => {
        feature.color.blendTo('blue'); // Not supported in CARTO-VL v0.8.0
      },
      reset: () => {
        feature.reset(); // Not supported in CARTO-VL v0.8.0
      }
    }))
    .sort((a, b) => b.value - a.value);
};

$categoryWidget.addEventListener('categoriesSelected', event => {
  resetViz();
  event.detail.forEach(selected => {
    const feature = $categoryWidget.categories.find(city => city.name === selected);
    feature && feature.select();
  })
});


function resetViz() {
  $categoryWidget.categories.forEach(feature => feature.reset());
}
