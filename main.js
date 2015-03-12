var resizer = function() {
  "use strict";
  var offsetHeight = document.querySelector('.menubar').offsetHeight;

  var fl = document.querySelector('.filelist');
  fl.style.height = (window.innerHeight - offsetHeight) + "px";

  var ep = document.querySelector('.editpanel');
  ep.style.height = (window.innerHeight - offsetHeight) + "px";
  ep.style.width = (window.innerWidth - fl.offsetWidth) + "px";

  var ed = document.querySelector('#editor');
  if (ed) {
    ed.style.height = (window.innerHeight - offsetHeight) + "px";
  }
};

window.onload = function () {
  "use strict";

  if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
  }

  /* add event resize listener */
  window.onresize = resizer;
  window.onresize();

  var fileListManager = new FileListManager(function (file) {
		if (file.name.toLowerCase().endsWith('.bmp')) {
		// 	var imageViewerElm = document.getElementById('image_viewer');
		// 	while (imageViewerElm.firstChild) {
		// 		imageViewerElm.removeChild(imageViewerElm.firstChild);
		// 	}
		// 	var myArray = file.asUint8Array();
		// 	var blob = new Blob([myArray], {'type': 'image/bmp'});
		// 	var imageUrl = URL.createObjectURL(blob); //different prefixes for different vendors
		// 	var img = new Image();
		// 	img.src = imageUrl;
		// 	imageViewerElm.appendChild(img);
		} else if (file.name.toLowerCase().endsWith('.png')) {
		// 	var imageViewerElm = document.getElementById('image_viewer');
		// 	while (imageViewerElm.firstChild) {
		// 		imageViewerElm.removeChild(imageViewerElm.firstChild);
		// 	}
		// 	var myArray = file.asUint8Array();
		// 	var blob = new Blob([myArray], {'type': 'image/png'});
		// 	var imageUrl = URL.createObjectURL(blob); //different prefixes for different vendors
		// 	var img = new Image();
		// 	img.src = imageUrl;
		// 	imageViewerElm.appendChild(img);
		} else if (file.name.endsWith('.xml') ||
		               file.name.endsWith('.rels')) {
			var editor = ace.edit("editor");
			editor.getSession().setValue(vkbeautify.xml(file.asText(), -1), 4);
		} else {
			alert('Not support!');
		}
    Editor.renderer.onResize(true);
  });

  /* add event input file listener */
  var inputObject = new InputObject(function(file) {
    fileListManager.open(file,
      function (element) {
        var fileListElm = document.querySelector('.filelist');
        while (fileListElm.firstChild) {
          fileListElm.removeChild(fileListElm.firstChild);
        }
        document.querySelector('.filelist').appendChild(element);
      },
      function (/*error*/) {
        console.log("Error!");
      }
    );
  })
};
