window.onload = function() {
  var elements = document.getElementById("slider");
  var imgArray = elements.getAttribute("image-rotate");
  console.log(elements);
  console.log(imgArray);
  slideShow(elements, JSON.parse(imgArray));
}

function slideShow(elements, imgArray) {
  this.elements = elements;
  this.imgArray = imgArray;
  console.log(this.elements);
  console.log(this.imgArray);
}
