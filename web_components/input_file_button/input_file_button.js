(function () {
  var link = document.querySelector('#input_file_button_import');
  var template = link.import.querySelector('#input_file_button');
  var clone = document.importNode(template.content, true);
  document.querySelector('.menubar').appendChild(clone);
}) ();

var InputObject = function (callback) {
  var wbutton = document.querySelector("#wrapped_button");
  var fobject = document.querySelector("#file_obj");
  wbutton.addEventListener('click', function (event) {
    fobject.click();
  }, false);
  fobject.addEventListener('change', function (event) {
    wbutton.disabled=true;
    callback(event.target.files[0]);
  }, false);
  this.init = function () {
    wbutton.disabled=false;
  }
};


