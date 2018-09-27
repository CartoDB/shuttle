const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
  center: [0, 30],
  zoom: 2,
  scrollZoom: false,
  dragRotate: false,
  touchZoomRotate: false,
});

map.fitBounds([
  [<%- data.map.extent[0] -%>, <%- data.map.extent[1] -%>], [<%- data.map.extent[2] -%>, <%- data.map.extent[3] -%>]
]);

const nav = new mapboxgl.NavigationControl({
  showCompass: false
});
map.addControl(nav, 'top-left');

// Define user
carto.setDefaultAuth({
  user: 'cartovl',
  apiKey: 'default_public'
});

const column = '<%- data.map.column -%>';
const cartoColorRamp = '<%- data.map.colorRamp -%>';

const colorRamp = `ramp(<%- data.map.columnType === "number" ? "viewportQuantiles" : "top" -%>(${column}, 7), ${cartoColorRamp})`;
// type can be "top" if string/category, "wieportQuantiles" if numeric
const widthRamp = `width: blend(<%- data.map.geometry === "line" ? "1, 2.5" : "2, 20" -%>,${column})`;
// range can be "2, 20" if points, and "1, 2.5" if lines

let color = colorRamp, width = widthRamp;
// these variables can be set as default or as ramps

const cartovlStyle = `
    color: ${color}
    width: ${width}
    animation: animation(linear(${date},time(${min}),time(${min})),30,fade(0.1,0.5))
`;

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
