// Text Carousel
function TxtRotate(el, toRotate, period) {
  this.el = el;
  this.toRotate = toRotate;
  this.period = period;
  this.loopNum = 0;
  this.isDeleting = false;
  this.txt = "";
  this.tick();
}

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullText = this.toRotate[i];
  var delta = 250 - Math.random() * 100;

  if(this.isDeleting) {
    this.txt = fullText.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullText.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  if(this.isDeleting) {delta /= 2}

  if (!this.isDeleting && this.txt === fullText) {
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  delay(delta, this);
}

function delay(delta, that) {
  setTimeout(function() {
    that.tick();
  }, delta);
}

// Slider
function ImageRotate(slideShowElements, imgArray) {
  this.elements = slideShowElements;
  this.imgArray = imgArray;
  this.loopNum = 0;
  this.slideShow();
}

ImageRotate.prototype.slideShow = function() {
  var that = this;
  var i = this.loopNum % this.imgArray.length;
  //console.log(this.loopNum % this.imgArray.length);
  this.elements.className += "fadeOut";
  setTimeout(function() {
    that.elements.src = that.imgArray[i];
    that.elements.className = "";
  }, 1000);
  this.loopNum++;
  setTimeout(function() {
    that.slideShow();
  }, 7000);
}

window.onload = function() {
  // Text Carousel
  var elements = document.getElementsByClassName("txt-rotate");
  for (var i=0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-rotate");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  }
  // Slider
  var sliderElements = document.getElementById("slider");
  var imgArray = sliderElements.getAttribute("image-rotate");
  new ImageRotate(sliderElements, JSON.parse(imgArray));

  // Header animation
  var javaBoyElement = document.getElementById("javaboy");
  var javaBoyImages = javaBoyElement.getAttribute("image-rotate");
  var javaBoyJumpImages = javaBoyElement.getAttribute("image-jump-rotate");
  new JavaBoy(javaBoyElement, JSON.parse(javaBoyImages), JSON.parse(javaBoyJumpImages));
}

function JavaBoy(element, imgArray, imgJumpArray) {
  this.element = element;
  this.imgArray = imgArray;
  this.imgJumpArray = imgJumpArray;
  this.loopNum = 0;
  this.loopJumpNum = 0;
  this.x = -500;
  this.y = -15;
  this.isJumping = true;
  this.disp();
}

JavaBoy.prototype.disp = function() {
  var that = this;
  var i = this.loopNum % this.imgArray.length;
  var j = this.loopJumpNum % this.imgJumpArray.length;
  this.x = this.x + 3;
  if(this.x > -45 && this.x < 75) {
    this.element.src = this.imgJumpArray[i];
    this.element.style.left = this.x + "px";
    console.log(this.y);
    if (this.isJumping) {
      this.y = this.y - 4;
      this.element.style.top = this.y + "px";
      if (this.y < -85) {
        this.isJumping = false;
      }
    } else {
      this.y = this.y + 3;
      this.element.style.top = this.y + "px";
    }
  } else if (y = -15) {
    this.element.src = this.imgArray[i];
    this.element.style.left = this.x + "px";
  }
  setTimeout(function () {
    if(that.x < 1500) {
      that.disp();
    }
  }, 60);
  this.loopNum++;
}
