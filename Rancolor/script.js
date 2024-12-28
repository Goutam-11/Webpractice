const arr=["red","green","yellow","pink","blue"]

var random;

for(i=1;i<=arr.length;i++){
    random = Math.floor(Math.random() * arr.length);
    document.querySelectorAll(".box")[i-1].style.backgroundColor=arr[random]
}