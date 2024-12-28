
function getRandomColor(){
    var val1=Math.floor(Math.random()*256);
    var val2=Math.floor(Math.random()*256);
    var val3=Math.floor(Math.random()*256);
    return `rgb(${val1},${val2},${val3})`
}


for (i = 1; i <= 5; i++) {
  document.querySelectorAll(".box")[i - 1].style.backgroundColor = getRandomColor();
}
