window.onscroll = function() {
  scroll();
}

function scroll() {
  console.log(window.pageYOffset);
    if (window.pageYOffset < 25) {
      document.getElementById("home-top").style.top = "0";
    } else {
      document.getElementById("home-top").style.top = "-136px";
    }
}
