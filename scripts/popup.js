// i18n
var objects = document.getElementsByTagName('html');
for (var j = 0; j < objects.length; j++)
{
  var obj = objects[j];

  var valStrH = obj.innerHTML.toString();
  var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function(match, v1)
  {
    return v1 ? chrome.i18n.getMessage(v1) : '';
  });

  if(valNewH != valStrH)
  {
    obj.innerHTML = valNewH;
  }
}

// Bind DOM elements
var pickButton = document.getElementById('pick-button');
var configuration = document.getElementById('configuration');

pickButton.onclick = function() {
  // Send `enablePicker` event
  chrome.tabs.getSelected(null, function(tab) {
    chrome.tabs.sendMessage(tab.id, { action: 'enablePicker' });
  });
};
