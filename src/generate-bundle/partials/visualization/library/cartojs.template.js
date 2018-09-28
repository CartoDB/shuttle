const map = L.map('map').fitBounds([
  [<%- data.map.extent[1] -%>, <%- data.map.extent[0] -%>], [<%- data.map.extent[3] -%>, <%- data.map.extent[2] -%>]
]);
map.scrollWheelZoom.disable();

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/<%- data.map.basemap -%>/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

const client = new carto.Client({
  apiKey: '<%- data.apiKey -%>',
  username: '<%- data.username -%>'
});

<% if (data.map.type === 'choropleth') { %>
  const source = new carto.source.SQL('SELECT *, ST_Area(the_geom) as pol_area FROM <%- data.map.dataset -%>');
<% } else { %>
  const source = new carto.source.Dataset('<%- data.map.dataset -%>');
<% } %>

const column = '<%- data.map.column -%>';
const colorRamp = '<%- data.map.colorRamp -%>';

<% if (data.map.columnType !== 'date') { %>
  <% if (data.map.type === 'default') { %>
    <% if (data.map.geometry === 'point') { %>
      const marker_width = 7;
      const marker_fill = '#EE4D5A';
    <% } %>

    <% if (data.map.geometry === 'line') { %>
      const line_width = 1.5;
      const line_color = '#4CC8A3';
    <% } %>

    <% if (data.map.geometry === 'polygon') { %>
      const polygon_fill = '#826DBA';
    <% } %>
  <% } %>

  <% if (data.map.type === 'bubbles') { %>
    <% if (data.map.geometry === 'point') { %>
      const marker_width = `ramp([${column}], range(2,20), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
      const marker_fill = '#EE4D5A';
    <% } %>
    <% if (data.map.geometry === 'line') { %>
      const line_width = `ramp([${column}], range(1,2.5), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
      const line_color = '#4CC8A3';
    <% } %>
  <% } %>

  <% if (data.map.type === 'category') { %>
    <% if (data.map.geometry === 'point') { %>
      const marker_width = 7;
      const marker_fill = `ramp([${column}], cartocolor(${colorRamp}), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
    <% } %>

    <% if (data.map.geometry === 'line') { %>
      const line_width = 1.5;
      const line_color = `ramp([${column}], cartocolor(${colorRamp}), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
    <% } %>

    <% if (data.map.geometry === 'polygon') { %>
      const polygon_fill = `ramp([${column}], cartocolor(${colorRamp}), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
    <% } %>
  <% } %>

  <% if (data.map.type === 'choropleth') { %>
    <% if (data.map.geometry === 'polygon') { %>
      const polygon_fill = `ramp([${column}], cartocolor(${colorRamp}), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
    <% } %>
  <% } %>

  <% if (data.map.type === 'gradient') { %>
    <% if (data.map.geometry === 'point') { %>
      const marker_width = 7;
      const marker_fill = `ramp([${column}], cartocolor(${colorRamp}), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
    <% } %>

    <% if (data.map.geometry === 'line') { %>
      const line_width = 1.5;
      const line_color = `ramp([${column}], cartocolor(${colorRamp}), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
    <% } %>
  <% } %>

  <% if (data.map.type === 'flow') { %>
  const line_width = `ramp([${column}], range(1,2.5), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
  const line_color = `ramp([${column}], cartocolor(${colorRamp}), <%- data.map.columnType === 'number' ? 'quantiles' : 'category' -%>(7))`;
  <% } %>
<% } else { %>
  const marker_width = 7;
  const marker_fill = '#EE4D5A';
<% } %>

const cartoCSSStyle = new carto.style.CartoCSS(`
  <% if (data.map.geometry === 'point') { %>
  #layer['mapnik::geometry_type'=1] {
    marker-width: ${marker_width};
    marker-fill: ${marker_fill};
    marker-fill-opacity: 0.9;
    marker-line-color: #FFFFFF;
    marker-line-width: 1;
    marker-line-opacity: 1;
    marker-type: ellipse;
    marker-allow-overlap: true;
  }
  <% } %>
  <% if (data.map.geometry === 'line') { %>
  #layer['mapnik::geometry_type'=2] {
    line-color: ${line_color};
    line-width: ${line_width};
    line-opacity: 1;
  }
  <% } %>
  <% if (data.map.geometry === 'polygon') { %>
  #layer['mapnik::geometry_type'=3] {
    polygon-fill: ${polygon_fill};
    polygon-opacity: 0.9;
    ::outline {
        line-color: #FFFFFF;
        line-width: 1;
        line-opacity: 0.5;
    }
  }
  <% } %>`);

const layer = new carto.layer.Layer(source, cartoCSSStyle);

client.addLayer(layer);
client.getLeafletLayer().addTo(map);
