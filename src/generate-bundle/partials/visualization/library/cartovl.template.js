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

const column = '$<%- data.map.column -%>';
const cartoColorRamp = '<%- data.map.colorRamp -%>';

<% if (data.map.type === 'default') { %>
  <% if (data.map.geometry === 'point') { %>
    const width = 7;
  <% } else { %>
    const width = 1.5;
  <% } %>

  const color = '#EE4D5A';
<% } %>

<% if (data.map.type === 'bubbles') { %>
  const width = `blend(<%- data.map.geometry === "line" ? "1, 2.5" : "2, 20" -%>,${column})`;
  const color = '#EE4D5A'
<% } %>

<% if (data.map.type === 'category' || data.map.type === 'choropleth' || data.map.type === 'gradient') { %>
  const width = `7`;
  const color = `ramp(<%- data.map.columnType === "number" ? "viewportQuantiles" : "top" -%>(${column}, 7), ${cartoColorRamp})`;
<% } %>

<% if (data.map.type === 'flow') { %>
  const width = `ramp([${column}], range(1,2.5), quantiles(7))`;
  const color = '#EE4D5A';
  <% } %>

// Define layer
const source = new carto.source.Dataset('<%- data.map.dataset -%>');
const viz = new carto.Viz(`
  width: ${width}
  color: ${color}
  strokeWidth: 0.5
  strokeColor: #191970
  <% if (data.map.animated) { %>
  animation: animation(linear(${date},time(${min}),time(${min})),30,fade(0.1,0.5))
  <% } %>
`);
const layer = new carto.Layer('layer', source, viz);

layer.addTo(map, 'watername_ocean');
