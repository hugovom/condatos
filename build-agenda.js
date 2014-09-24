var csv = require('csv');
var _ = require('./bower_components/underscore/underscore-min.js');

/**
 * For local use:
 * % ✗ python -m SimpleHTTPServer
 * var http = require('http');
 * var csv_url = 'http://localhost:8000/agenda.csv';
 * use http.get
 *
*/

var https = require('https');
var csv_url = 'https://docs.google.com/spreadsheets/export?id=15Dtd8_Y14no-0KSxh8zNwiNnmo3LIJZyiS-je7liCTM&exportFormat=csv';

var language = process.argv[2] || "es";

https.get(csv_url, function(res) {
  var response = "";

  res.on('data', function(chunk) {
    response += chunk;
  });

  res.on('end', function() {
    response = response.toString();
    csv.parse(response, function(err, output) {
      var events = csvArrayToJSON(output);
      var html = buildScheduleHtml(events);
      console.log(html);
    });
  });

}).on('error', function(e) {
  console.error(e);
});

function csvArrayToJSON(csvArray) {
  var headers = _.head(csvArray);
  var rows = _.rest(csvArray);
  var rowObjects = _.map(rows, function(value, key, list) {
    return _.object(headers, value);
  });
  return rowObjects;
}

function buildScheduleHtml(events) {
  var html = "";

  var eventsByHour = _.groupBy(events, 'Hora Inicio');
  _.each(eventsByHour, function(value, key) {
    html += buildScheduleRow(eventsByHour[key], key);
  });

  return html;
}

function buildScheduleRow(eventsInAnHour, hour) {
  var html = "<td>" + hour + "</td>";

  html += _.reduce(_.where(eventsInAnHour, { 'Día': '1' }), function(memo, event) {
    return memo + buildEventLink(event);
  }, "<td>");
  html += "</td>";

  html += _.reduce(_.where(eventsInAnHour, { 'Día': '2' }), function(memo, event) {
    return memo + buildEventLink(event);
  }, "<td>");
  html += "</td>";

  return "<tr>" + html + "</tr>";
}

function buildEventLink(event) {
  var trackClassMap = {
    'Actores, políticas y principios': 'politicas',
    'Innovación y uso': 'innovacion',
    'Plataformas y herramientas': 'herramientas',
    'Plenarias': 'Plenarias'
  };
  event['trackClass'] = trackClassMap[event['Track']] || 'condatos';
  event['title'] = language == 'en' ? event['Panel inglés'] : event['Panel español'];

  var klass = "btn-<%= e['trackClass'] %> btn btn-default btn-s";
  var href = "../agenda/" + language + "-<%= e.Día %>-<%= e['Hora Inicio'] %>-<%= e.trackClass %>.html";
  var template = "<a class='" + klass + "' href='" + href + "'><%= e.title %></a>";
  var compiled = _.template(template);
  return compiled({ e: event });
}

