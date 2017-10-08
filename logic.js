//x-rida
//y=tulp

<!--LAUA MASSIIV JA POMMID-->

// returns board as list of lists like [[0,1],[1,0]]
// size is the row/col length, bombs the number of bombs to insert
// NB! This algorithm may become slow if the nr of bombs is close to
// the board area (i.e. almost all the board covered with bombs)
//
function makeBoard(size,bombs) {
  var board = [];
  
  console.log("makeboard");
  
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
    x=Math.floor(Math.random() * size);
    y=Math.floor(Math.random() * size);
    // put bomb on x,y unless there is a bomb already
    if (board[x][y]!=1) {
      board[x][y]=1;
      i--; // bomb successfully positioned, one less to go
      console.log("positioned "+x+", "+y+" yet to go "+i);
    }
   
  }
  
  return board;
}


function draw(x,y) {
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




<!--NAABRID-->

function neighbours(size,x,y) {
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
  console.log(list);
}  

function reload() {
    window.location.reload();
}





