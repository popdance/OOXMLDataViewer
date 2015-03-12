(function () {
  var link = document.querySelector('#edit_panel_import');
  var template = link.import.querySelector('#tp_editor');
  var clone = document.importNode(template.content, true);
  document.querySelector('.editpanel').appendChild(clone);
}) ();

var Editor = ace.edit("editor");

(function () {
  var XmlMode = require("ace/mode/xml").Mode;
  Editor.setTheme("ace/theme/twilight");
  Editor.getSession().setMode(new XmlMode());
}) ();