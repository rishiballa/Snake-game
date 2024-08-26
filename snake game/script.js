let inputDir = {x: 0, y: 0}; 
let speed = 12;
let score=0;
let lastPaintTime = 0;
let snakearr = [
    {x: 13, y: 15}
];
let food={x:15,y:13};

function main(ctime) {
    
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
  
    game();
}

function collide(snakearr) {
    for (let i = 1; i < snakearr.length; i++) {
        if(snakearr[i].x === snakearr[0].x && snakearr[i].y === snakearr[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snakearr[0].x >= 18 || snakearr[0].x <=0 || snakearr[0].y >= 18 || snakearr[0].y <=0){
        return true;
    }
        
    return false;
}
function game() {

    if(collide(snakearr)){
        inputDir={x:0,y:0};
        alert("Game Over Press any key");
        snakearr=[{x:13,y:15}];
        score=0

    }
    //if you ahbe eaten the food regen food and increase score
    if(snakearr[0].x===food.x && snakearr[0].y===food.y){
        snakearr.unshift({x:snakearr[0].x + inputDir.x, y: snakearr[0].y +inputDir.y})
        score+=1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highscorebox.innerHTML = "HiScore: " + hiscoreval;
        }
        scorebox.innerHTML="Score: "+score;
        
        let a=2;
        let b=16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
    
    //moving a snake
    for(let i=snakearr.length-2; i>=0;i--) {
        
        snakearr[i+1]={...snakearr[i]}; //all togather new object
    }
    snakearr[0].x += inputDir.x;
    snakearr[0].y += inputDir.y;
    
    //displaying snake
    board.innerHTML = " ";
    snakearr.forEach((e, index)=>{
        snakeelement = document.createElement('div');
        snakeelement.style.gridRowStart = e.y;
        snakeelement.style.gridColumnStart = e.x;
        if(index===0) {
            snakeelement.classList.add('head');
        }
        else {
        snakeelement.classList.add('snake');
        }
        board.appendChild(snakeelement);
    });

    //displaying food

    foodelement=document.createElement('div');
    foodelement.style.gridRowStart=food.y;
    foodelement.style.gridColumnStart=food.x;
    foodelement.classList.add('food');
    board.appendChild(foodelement);
}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscorebox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);

window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1};
    switch(e.key) {
        case "ArrowUp":
        console.log("ArrowUp");
        inputDir.x=0;
        inputDir.y=-1;
        break;
        case "ArrowDown":
        console.log("ArrowDown");
        inputDir.x=0;
        inputDir.y=1;
        break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
    }
})