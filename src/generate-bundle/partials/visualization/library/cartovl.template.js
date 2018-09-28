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
  apiKey: '<%- data.apiKey -%>',
  user: '<%- data.username -%>'
});

const column = '$<%- data.map.column -%>';
const cartoColorRamp = '<%- data.map.colorRamp -%>';

<% if (data.map.type === 'default' || data.map.type === 'animated') { %>
  <% if (data.map.geometry === 'point') { %>
    const width = 7;
  <% } else { %>
    const width = 1.5;
  <% } %>

  const color = '#EE4D5A';
<% } %>

<% if (data.map.type === 'bubbles' || data.map.type === 'flow') { %>
  const width = `ramp(sqrt(linear(clusterSum(${column}))), [3, 30])\nresolution: 8`;
  const color = '#EE4D5A'
<% } %>

<% if (data.map.type === 'category' || data.map.type === 'choropleth' || data.map.type === 'gradient') { %>
  const width = `7`;
  <% if (data.map.columnType === 'number') { %>
    const color = `ramp(viewportQuantiles(${column}, 7), ${cartoColorRamp})`;
  <% } else if (data.map.columnType === 'string') { %>
    const color = `ramp(${column}, ${cartoColorRamp})`;
  <% } %>
<% } %>

// Define layer
const source = new carto.source.Dataset('<%- data.map.dataset -%>');
const viz = new carto.Viz(`
  width: ${width}
  color: ${color}
  strokeWidth: 0.5
  strokeColor: #191970
  <% if (data.map.animated) { %>
  filter: animation(linear(${column},globalMin(${column}),globalMax(${column})),30,fade(0.1,0.5))
  <% } %>
`);
const layer = new carto.Layer('layer', source, viz);

layer.addTo(map, 'watername_ocean');
