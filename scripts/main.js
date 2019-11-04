const canvas = document.querySelector('#canvas');

document.querySelector('#bn').addEventListener("click", function() {
    removeElementsByClass('cell');
    //const inputX = document.getElementById("x");
    let inputX = prompt("Introduzca tamaño:", "16");
    let dimension = inputX;
    makeGrid(dimension);
    medium("shader");
  });

function makeGrid(dimension) {
    const canvasWidth = document.getElementById("canvas").offsetWidth;
    const cellWidth = canvasWidth / dimension;
  
    for (let x = 1; x <= dimension * dimension; x++) {
      const makeCell = document.createElement('div');
      makeCell.classList.add('cell');
      canvas.appendChild(makeCell);    
    };
  
    canvas.style.gridTemplateRows = `repeat(${dimension}, ${cellWidth}px [row-start]`;
    canvas.style.gridTemplateColumns = `repeat(${dimension}, ${cellWidth}px [column-start]`;  
  } 

document.querySelector('#black').addEventListener("click", e => medium("black"));
document.querySelector('#shader').addEventListener("click", e => medium("shader"));
document.querySelector('#random').addEventListener("click", e => medium("random"));
document.querySelector('#eraser').addEventListener("click", e => medium("eraser"));
document.querySelector('#bn').addEventListener("click", e => medium("clear"));

  function medium(selected) {
    let cells = document.querySelectorAll('div.cell');
    cells.forEach(cell => {        
      cell.addEventListener('mouseover', function(e){
        if (selected == "black") {
          cell.classList.remove('shade');
          cell.style.backgroundColor = '#101010';
          cell.style.opacity = '1';
        } 
        else if (selected == "shader") {
          cell.classList.remove('black');
          let opacity = this.style.opacity;
            if(!this.classList.contains("shade")) {
              this.classList.add('shade');
              this.setAttribute('style', 'opacity:0.1');
              this.style.backgroundColor = '#101010';
              console.log("add class")
            } 
            else {
              this.style.opacity = `${(Number(opacity) + 0.1)}`;
              console.log("increase opacity " + opacity + " by 0.1")
            }
        } 
        else if (selected == "random") {
          let x = Math.floor(Math.random() * 256);
          let y = Math.floor(Math.random() * 256);
          let z = Math.floor(Math.random() * 256);
          let randomColor = `rgb(${x},${y},${z})`;
          cell.classList.remove('shade');
          cell.style.opacity = '1';
          cell.style.backgroundColor = randomColor;
        } 
        else if (selected == "eraser") {
          cell.classList.remove('shade');
          cell.style.backgroundColor = '#e8dfd6';
          cell.style.opacity = '1';
        }
      })     
      if (selected == "clear") {
        clear(cell);
      } 
    });
  }

  function clear(cell) {
    cell.classList.remove('black');
    cell.style.removeProperty('background-color');
    cell.classList.remove('shade');
    cell.style.removeProperty('opacity');
  }

  function removeElementsByClass(className) { 
    var elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
  }

makeGrid(16); // grid
medium("black"); // default

