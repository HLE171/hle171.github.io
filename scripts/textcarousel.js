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

window.onload = function() {
  console.log("Text Carousel Injected");
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
}
