function createHeart(){
    const heart = document.createElement('div');
    heart.classList.add('heart');

    heart.style.left = Math.random() * 100 + 'vw'
    heart.style.fontSize =  (Math.random() * 5) + 3 + 'em'
    heart.innerText = "❤️";
    heart.style.animationDuration =  (Math.random() * 1) + 0.5 + 's';

    heart.addEventListener("click", function() {addPoints(heart)}); 
    
    document.body.appendChild(heart);
    
    setTimeout(() => {heart.remove()}, 5000);
}

const txtPoints = document.getElementById("points");
var points = 0;
function addPoints(heart){
    points++;
    heart.remove();
    txtPoints.innerText = points;
    if(points >= 20){
        txtPoints.innerText = "👾🕹️"
        clearInterval(falling);
    }
}

const falling = setInterval(createHeart, 300);