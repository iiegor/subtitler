var videoEl = null,
  captions;

// Captions
function Captions(opts) {

}

Captions.prototype.load = function(url, external) {

};

Captions.prototype.compose = function(variables) {
  
};

// Bind page events
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action && (request.action == 'enablePicker')) {
    document.addEventListener('mouseover', function(evt) {
      evt.target.style.cursor = 'crosshair';
      evt.target.style.background = 'rgba(229, 57, 53, .5)';

      // onmouseout
      var mouseout = function(evt) {
        evt.target.style.background = null;
      };

      evt.target.addEventListener('mouseout', mouseout, false);

      // onclick
      evt.target.onclick = function(evt) {
        evt.preventDefault();

        if (videoEl) {
          return;
        } else if(evt.target.tagName !== 'VIDEO') {
          return alert('You must select a <video> element :(');
        } else videoEl = evt.target;

        evt.target.style.background = 'rgba(229, 57, 53, .5)';
        evt.target.style.border = '1px solid #B71C1C';

        // remove listeners
        evt.target.removeEventListener('mouseout', mouseout, false);

        // init captions
        captions = new Captions(request.opts);
      };
    }, false);
  } else if (request.action && (request.action == 'initCaptions')) {
    captions = new Captions(request.opts);
  }
});