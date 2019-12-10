
// retrieve image and convert to base64
function retrieveImageFromClipboardAsBase64(pasteEvent, callback, imageFormat) {
  if (pasteEvent.clipboardData == false) {
    if (typeof (callback) == "function") {
      callback(undefined);
    }
  };

  var items = pasteEvent.clipboardData.items;

  if (items == undefined) {
    if (typeof (callback) == "function") {
      callback(undefined);
    }
  };

  for (var i = 0; i < items.length; i++) {
    // Skip content if not image
    if (items[i].type.indexOf("image") == -1) continue;
    // Retrieve image on clipboard as blob
    var blob = items[i].getAsFile();

    // Create an abstract canvas and get context
    var mycanvas = document.createElement("canvas");
    var ctx = mycanvas.getContext('2d');

    // Create an image
    var img = new Image();
    var maxSize = 480;
    // Once the image loads, render the img on the canvas
    img.onload = function () {
      // Update dimensions of the canvas with the dimensions of the image
      // mycanvas.height = img.height > img.width ? maxSize : ~~(img.height / img.width * maxSize);
      // mycanvas.width = img.width > img.height ? maxSize : ~~(img.width / img.height * maxSize);
      mycanvas.width = this.width;
      mycanvas.height = this.height;

      // Draw the image
      ctx.drawImage(img, 0, 0, mycanvas.width, mycanvas.height);

      // Execute callback with the base64 URI of the image
      if (typeof (callback) == "function") {
        callback(mycanvas.toDataURL(
          (imageFormat || "image/png")
        ));
      }
    };

    // Crossbrowser support for URL
    var URLObj = window.URL || window.webkitURL;

    // Creates a DOMString containing a URL representing the object given in the parameter
    // namely the original Blob
    img.src = URLObj.createObjectURL(blob);
  }
}

export { retrieveImageFromClipboardAsBase64 };