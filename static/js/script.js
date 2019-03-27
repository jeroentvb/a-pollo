// Code for links inside a apple-mobile content enabled app
var a = document.getElementsByTagName('a')
for (let i = 0; i < a.length; i++) {
  a[i].onclick = function () {
    window.location = this.getAttribute('href')
    return false
  }
}
