//x-rida
//y=tulp

var size;
var bombs;
var board = [];
var moves;


<!--LAUA MASSIIV JA POMMID-->

// returns board as list of lists like [[0,1],[1,0]]
// size is the row/col length, bombs the number of bombs to insert
// NB! This algorithm may become slow if the nr of bombs is close to
// the board area (i.e. almost all the board covered with bombs)
//

function createTable() {
    
    document.getElementById("gameBoard").innerHTML = "";
    moves = 0;
    document.getElementById("msg").innerHTML = "";
    size = document.getElementById('grid').value;
    bombs = document.getElementById('numOfMines').value;
    makeBoard(size, bombs);
    console.log("Mängulaua suurus: " + size);
    console.log("Pommide arv mängulaual: " + bombs);
    
    var place = document.getElementById('gameBoard');
    var table = document.createElement('table');
    table.setAttribute("id", "table");
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
    //place.innerHTML = table;
    //tableCell.addEventListener("click", clickCell);
}

function clickCell(cell) {
    moves++;
    document.getElementById("msg").innerHTML = moves;
    var clickedCell = cell.target.id;
    var x = clickedCell.substring(0,clickedCell.search("_"));
    var y = clickedCell.substring(clickedCell.search("_")+1);
    document.getElementById(x+"_"+y).setAttribute("style", "background-color: white");
    console.log("Sinu käik: " + x +  " ja " + y);
    console.log(neighbours(size, x, y));
    var z = neighbours(size, x, y);
    console.log(countBombs(z));
    makeMove(x, y);
}

function makeMove(x, y) {
    
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
        
    }
}

function makeBoard(size,bombs) {
  //var board = [];
  
  //console.log("makeboard");
  
  if (bombs>=size*size) throw "too many bombs for this size";
  if (bombs == "")  throw "missing amount of bombs";
  
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
    
    var totBombs = 0;
    for (var i = 0; i < array.length; i++){
         //console.log(array[i][1]+ "_" + array[i][0]);
        if (board[array[i][1]][array[i][0]] == 1)
        {
            totBombs++;
        }
    }
    return totBombs;
}




function reload() {
    window.location.reload();
}


/*function draw(x,y) {
    size = document.getElementById('grid').value;
    
    bombs = document.getElementById('numOfMines').value;
    var board = makeBoard(size, bombs);
    console.log("Size of board " + size);
    console.log("Number of mines " + bombs);
    
    for(var x=0;x<parseInt(size,10) ;x++){
        var tableRow=document.getElementById('gameBoard').insertRow(x);
        tableRow.id = tableRow.rowIndex;
        for(var y = 0; y < parseInt(size,10); y++){
            var tableCell=  tableRow.insertCell(y);
            y.innerHTML="Row-"+x+" Column-"+y;
            tableCell.id = tableRow.id + "_" + tableCell.cellIndex;
          
            
        }
    }
}
*/