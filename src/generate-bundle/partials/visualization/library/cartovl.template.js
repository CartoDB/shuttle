const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  center: [0, 30],
  zoom: 2,
  scrollZoom: false,
  dragRotate: false,
  touchZoomRotate: false,
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
  width: 8
  color: #6A5ACD
  strokeWidth: 0.5
  strokeColor: #191970
`);
const layer = new carto.Layer('layer', source, viz);

layer.addTo(map, 'watername_ocean');
