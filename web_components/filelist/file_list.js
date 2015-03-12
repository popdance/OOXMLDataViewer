var FileListManager = function (callback) {
  var docx_mime_type = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  var haan_docx_mime_type = "application/haansoftdocx";
  var CheckType = function (file) {
    if (file.type == docx_mime_type ||
        file.type == haan_docx_mime_type) {
			return true;
		} else {
		  return false;
		}
  };

  var openOOXML = function (file, resolver) {
		var fileReader = new FileReader();
		fileReader.onload = resolver;
		fileReader.readAsArrayBuffer(file);
	};

	var onOpenFile = function (event) {
	  var file = event.target.file;
	  callback(file);
	};

	var displayNoneElement = function (directory) {
    var uls = directory.querySelectorAll('ul');
    for (var ulIndex = 0; ulIndex < uls.length; ulIndex++) {
      var ul = uls[ulIndex];
      ul.style.setProperty('display', 'none');
    }

    var lis = directory.querySelectorAll('li');
    for (var liIndex = 0; liIndex < lis.length; liIndex++) {
      var li = lis[liIndex];
      li.style.setProperty('display', 'none');
    }
	}

	var displayDefaultElement = function (directory) {
	  var children = directory.childNodes;
	  for (var i=0, len=children.length; i < len; i++) {
	    if (children[i].nodeType == 1 && (
	            children[i].nodeName == "UL" ||
	            children[i].nodeName == "LI" ||
	            children[i].nodeName == "A")) {
	      children[i].style.removeProperty("display");
	      if (children[i].nodeName == "UL") {
	        displayDefaultElement(children[i]);
	      }
      }
    }
	};

	var onClickDirectory = function(event) {
	  event.stopPropagation();
	  event.preventDefault();
	  var expState = event.target.getAttribute("exp_state");
	  if (expState == 1) {
	    event.target.setAttribute("exp_state", 0);
	    displayDefaultElement(event.target);
	  } else {
	    event.target.setAttribute("exp_state", 1);
	    displayNoneElement(event.target);
	  }
	  return false;
	}

	var readEntry = function (parent, entryname, file, depth) {
	  var splitedString = entryname.split('/');
	  if (splitedString.length > 1) {
	    var ulDirectoryContainer = null;
	    var liDirectoryContainer = parent.querySelector("#"+splitedString[0]+"_"+depth);
	    if (!liDirectoryContainer) {
  	    var liDirectoryContainer = document.createElement("li");
  	    liDirectoryContainer.setAttribute("id", splitedString[0]+"_"+depth);
  	    liDirectoryContainer.setAttribute("class", "directory");
  	    liDirectoryContainer.setAttribute("exp_state", 1);
  	    liDirectoryContainer.style.paddingLeft = "23px";
  	    liDirectoryContainer.innerHTML = splitedString[0];
  	    liDirectoryContainer.onclick = onClickDirectory;
        ulDirectoryContainer = document.createElement("ul");
        ulDirectoryContainer.setAttribute("id", splitedString[0]+"_"+depth+"_ul");
  		  liDirectoryContainer.appendChild(ulDirectoryContainer);
		    parent.insertBefore(liDirectoryContainer, parent.firstChild);
	    } else {
        ulDirectoryContainer = parent.querySelector("#"+splitedString[0]+"_"+depth+"_ul");
	    }
      if (ulDirectoryContainer != null) {
    		var subentryname = entryname.substring(splitedString[0].length + 1, entryname.length);
    		readEntry(ulDirectoryContainer, subentryname, file, (depth + 1));
      }
      displayNoneElement(ulDirectoryContainer);
	  } else {
  		var liFileContainer = document.createElement("li");
  		liFileContainer.style.paddingLeft = "23px";
  		liFileContainer.setAttribute("class", "file");
  		var linkFileContainer = document.createElement("a");
  		linkFileContainer.innerHTML = splitedString[0];
  		linkFileContainer.href = "#";
  		linkFileContainer.file = file;
  		linkFileContainer.onclick = onOpenFile;
  		liFileContainer.appendChild(linkFileContainer);
  		parent.appendChild(liFileContainer);
	  }
  };

  this.open = function (file, resolver, error) {
    if (CheckType(file)==false) {
      error();
      return;
    }

    openOOXML(file, function(event)  {
			var loadedJSZip = new JSZip(event.target.result);
			var rootULElm = document.createElement('ul');
			for (var entryFileName in loadedJSZip.files) {
			  readEntry(rootULElm, entryFileName, loadedJSZip.files[entryFileName], 0);
			}
			resolver(rootULElm);
		});
  };

  this.initManager = function() {
    var listElm = document.querySelector('#filelist_ul');
		while (listElm.firstChild) {
			listElm.removeChild(listElm.firstChild);
		}
  }
};