var size;
var bombs;
var board = [];
var moves;
var gameOn;


function alusta() {
    document.getElementById("gameBoard").innerHTML = "";
    document.getElementById("msg").innerHTML = "";
    moves = 0;
    createTable();
    
}

function createTable() {
    size = document.getElementById('grid').value;
    bombs = document.getElementById('numOfMines').value;
    
    if (bombs == "" || bombs == 0 ) {
        alert("siseta pommide arv");
        return;
    }
    else if (bombs>=size*size) {
        alert("liiga palju pomme");
        return;
    }
    
    makeBoard(size, bombs);
 
    console.log("Mängulaua suurus: " + size);
    console.log("Pommide arv mängulaual: " + bombs);
    
    var place = document.getElementById('gameBoard');
    var table = document.createElement('table');
    var tableBody = document.createElement('tbody');
    for (var x = 0; x < parseInt(size,10); x++){
        var tableRow = document.createElement('tr');
        var board=[];
        for (var y = 0; y < parseInt(size,10); y++){
            var tableCell = document.createElement('td');
            tableCell.id = x + "_" + y;
            tableCell.addEventListener("click", clickCell);
            tableRow.appendChild(tableCell);
        }
        tableBody.appendChild(tableRow);
       
    }
    table.appendChild(tableBody);
    place.appendChild(table);
    
    if (size == 6) {
        table.setAttribute("class", "six");
        tableCell.setAttribute("class", "tdSix")
    }
    if (size == 9) {
        table.setAttribute("class", "nine")
        tableCell.setAttribute("class", "tdNine")
    }
    if (size == 16) {
        table.setAttribute("class", "sixteen")
        tableCell.setAttribute("class", "tdSixteen")
    }
    gameOn = true;
}

function makeBoard(size,bombs) {
    
    //if (bombs>=size*size) throw "too many bombs for this size";
    //if (bombs == "") throw "missing amount of bombs";
    //if (bombs == 0) throw "missing amount of bombs";
    
   
  
    // initialize board, filling with zeros
    for (var x=0; x<size; x++) {
        board[x]=[]; // insert empty subarray
        for (var y=0; y<size; y++) board[x][y]=0;
    }

    // now fill board with bombs in random positions
    var i=bombs;
    while (i>0) {
        // generate random x and y in range 0...size-1
        var x=Math.floor(Math.random() * size);
        var y=Math.floor(Math.random() * size);
        // put bomb on x,y unless there is a bomb already
        if (board[x][y]!=1) {
          board[x][y]=1;
          i--; // bomb successfully positioned, one less to go
          console.log("positioned "+x+", "+y+" yet to go "+i); 
        }
    }  
  return board;
  
}

function clickCell(cell) {
    
    if (gameOn == false) return;
    if (cell.target.innerHTML !="")return;
    moves++;
    document.getElementById("msg").innerHTML = "Käike: " + moves;
    var clickedCell = cell.target.id;
    var x = clickedCell.substring(0,clickedCell.search("_"));
    var y = clickedCell.substring(clickedCell.search("_")+1);
    document.getElementById(x+"_"+y).setAttribute("style", "background-color: white");
    //console.log("Sinu käik: " + x +  " ja " + y);
    //console.log(neighbours(size, x, y));
    var z = neighbours(size, x, y);
    console.log(countBombs(z));
    
    if (board[x][y] == 0){
        console.log("ei ole pomm");
        var z = neighbours(size, x, y);
        console.log(countBombs(z));
        document.getElementById(x + "_" + y ).innerHTML = countBombs(z); 
        
    }
    else if (board[x][y] == 1) {
        console.log("astusid pommi otsa");
        for (var i = 0; i < size; i++ ){
            for (var j = 0; j < size; j++){
                if (board[i][j] ==1){
                   document.getElementById(i + "_" + j ).setAttribute("class", "pomm"); 
                }
            }
        }
        
        document.getElementById("msg").innerHTML = "Kaotus, käike tegid: " + moves;
        gameOn = false;
        
    }
    if (size*size - bombs == moves) {
            document.getElementById("msg").innerHTML = "Võit, käike tegid: " + moves;
         gameOn = false;
        }
   
}


function neighbours(size,y,x) {
    
    x = parseInt(x);
    y = parseInt(y);    
    var list=[];
      for (var i=-1; i<=1; i++) {    
        for (var j=-1; j<=1; j++) {
          // square is not a neighbour of itself
          if (i==0 && j==0) continue;
          // check whether the the neighbour is inside board bounds
          if ((x+i)>=0 && (x+i)<size && (y+j)>=0 && (y+j)<size) {
            list.push([x+i,y+j]);  
          }
        }
      }
  return list;
  
}  

function countBombs(array) {
    
    var numOfBombs = 0;
    for (var i = 0; i < array.length; i++){
         //console.log(array[i][1]+ "_" + array[i][0]);
        if (board[array[i][1]][array[i][0]] == 1)
        {
            numOfBombs++;
        }
    }
    return numOfBombs;
}

/*function saveGame() {
    var player, game,url;
    
    player=document.getElementById("nimi").value; //tee input field kust saab mängija nime
    game=JSON.stringify(board);
    console.log(player);
    console.log(game);
    
    url=
    url+="?op=store&laud="+game+"&mangija="+player;
    fetch(url).then(r=>r.text()).then(handlestore)
}

function handlestore(x) {
    console.log("got it");
}*/
