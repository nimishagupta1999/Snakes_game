


function init()
{
     canvas = document.getElementById("mycanvas");
     pen = canvas.getContext("2d");
     W = canvas.width;
     H = canvas.height;
    score="5";
    game_over=false;
    
    food=getRandomfood();
    snake = {
        init_length: 5,
        color :" white",
        cells : [],
        direction : "right",
        
        createSnake:function()
        {
      for(var i=this.init_length-1;i>=0;i--)
        {
        this.cells.push({x:i,y:0});
        }
        },
            
            drawSnake: function()
{
            for(var i=0;i<this.cells.length;i++)
                {
                    pen.fillStyle = this.color;
                    pen.strokeStyle="yellow";
                    pen.fillRect(this.cells[i].x*10,this.cells[i].y*10,10,10);
                    
                }
         },
        
        updatesnake: function()
        {
        var headx=this.cells[0].x;
        
        var heady=this.cells[0].y;
        
        //nextheadx=headx+1;
       // this.cells.pop();
        //this.cells.unshift({x:nextheadx,y:heady});
            if(headx==food.x && heady==food.y)
                {
                    food=getRandomfood();
                    score++;
                    
                }
            else{
                this.cells.pop();
            }
            
            if(this.direction=="right")
                {
                    newheadx=headx+1;
                    newheady=heady;
                }
            else if(this.direction=="left")
                {
                    newheadx=headx-1;
                    newheady=heady;
                }
            else if( this.direction=="down")
                {
                    newheadx=headx;
                    newheady=heady+1;
                }
            else{
                newheadx=headx;
                newheady=heady-1;
            }
                this.cells.unshift({x:newheadx,y:newheady});
            
            var last_x=W/10;
            var last_y=H/10;
            
            if(this.cells[0].x>last_x || this.cells[0].y>last_y || this.cells[0].x<0 || this.cells[0].y<0)
                {
                    alert("Game Over\n High Score:"+score);
                    game_over=true;
                    
                }
       
    }
    };
    snake.createSnake();
    
    
    function keypressed(e)
    {
        if(e.key=="ArrowRight"){
            snake.direction= "right";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
    }
    document.addEventListener('keydown',keypressed);
}


function draw()
{
    pen.clearRect(0,0,W,H);
    
    snake.drawSnake();
    
    pen.fillStyle=food.color;
    pen.fillRect(food.x*10,food.y*10,10,10);
    pen.fillStyle="white";
    pen.font="10 px Arial";
    pen.fillText("Score :"+score,10,10);
}


function update()
{
    snake.updatesnake();
}


function game_loop()
{
    draw();
    update();
    if(game_over==true)
        {
            
            clearInterval(p);
        }
}

function getRandomfood()
{
    var foodx=Math.round(Math.random()*(W-10)/10);
    var foody=Math.round(Math.random()*(H-10)/10);
    
    foodColors = ["red","yellow","orange"];
    var i= Math.round(Math.round()*foodColors.length);
    
    food ={
        x:foodx,
        y:foody,
        
        color: foodColors[i],
    };
    return food;
}
init();
var p=setInterval(game_loop,110);  