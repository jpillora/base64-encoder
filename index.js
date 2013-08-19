
if (typeof window.FileReader === 'undefined')
  alert('File API & FileReader not supported');

var dropper = document.getElementById("dropper");
var results = document.getElementById("results");

dropper.ondragover = function () { dropper.className = 'hover'; return false; };
dropper.ondragend = function () { dropper.className = ''; return false; };
dropper.ondrop = function (e) {
  e.preventDefault();
  var file = e.dataTransfer.files[0],
      reader = new FileReader();
  reader.onload = function(event) {
    fileLoaded(file.name, event.target.result);
  };
  reader.readAsDataURL(file);
  dropper.className = '';
  return false;
};

function fileLoaded(filename, dataUri) {

  var div = document.createElement("div");
  div.className = 'item';

  var remove = document.createElement("button");
  remove.className = 'remove';
  remove.innerHTML = 'x';
  remove.onclick = function() {
    if(localStorage) localStorage.removeItem(filename);
    results.removeChild(div);
  };
  div.appendChild(remove);

  var name = document.createElement("div");
  name.innerHTML = filename;
  div.appendChild(name);

  if(/^data:image/.test(dataUri)) {
    var imgDiv = document.createElement("div");
    var img = document.createElement("img");
    img.src = dataUri;
    img.style['max-width'] = '100px';
    img.style['height-width'] = '100px';
    imgDiv.appendChild(img);
    div.appendChild(imgDiv);
  }

  var ta = document.createElement("textarea");
  ta.onclick = function() {
    ta.select();
  };
  ta.value = dataUri;
  div.appendChild(ta);

  results.appendChild(div);
  if(localStorage) localStorage.setItem(filename, dataUri);
}

if(localStorage)
  for(var filename in localStorage)
    fileLoaded(filename, localStorage.getItem(filename));


