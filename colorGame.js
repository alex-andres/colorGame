let numColors = 6;
let colors = colorGenerator(numColors);
let body = document.body;
let squares = document.querySelectorAll('.square');
let pickNotification = document.getElementById('pickNotification');
let header = document.querySelector('#header');
let rgb = document.querySelector('#RGB');
let newColors = document.querySelector('#newColors');
let modeButtons = document.querySelectorAll('.mode');
let difficulty = document.querySelectorAll('.difficulty');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function randomColor() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}
function colorGenerator(num) {
  var arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(randomColor());
  }
  return arr;
}
function changeColors(color) {
  //for loop that changes all squares background color to correct color
  for (let j = 0; j < squares.length; j++) {
    squares[j].style.backgroundColor = color;
  }
}

colorGenerator();

let pickedColor;
function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return (pickedColor = colors[random]);
}
pickColor();
rgb.textContent = pickedColor;
function colorAssignment() {
  for (let i = 0; i < squares.length; i++) {
    //assign background colors to squares using for loop
    squares[i].style.backgroundColor = colors[i];
    //adding event listener to each square
    squares[i].addEventListener('click', function() {
      let clickedColor = this.style.backgroundColor;
      //condition for selecting correct color
      if (pickedColor === clickedColor) {
        changeColors(clickedColor);
        //assigning the header background color to correct color
        header.style.backgroundColor = clickedColor;
        //changing textContent of notification to read Correct
        pickNotification.textContent = 'Correct!';
        newColors.textContent = 'Play Again?';
      } else {
        //hides incorrect square choice by making it the same color as body background color
        this.style.background = 'rgb(32, 31, 32)';
        //displays 'Try Again' in pickNotification Span
        pickNotification.textContent = 'Try Again';
      }
    });
  }
}
colorAssignment();
//sets the textContent of RGB span to the value of picked color
rgb.textContent = pickedColor;

function reset() {
  colors = colorGenerator(numColors);
  pickColor();
  rgb.textContent = pickedColor;
  colorGenerator();
  colorAssignment();
  header.style.backgroundColor = 'rgb(73, 119, 170)';
  pickNotification.textContent = '';
  newColors.textContent = 'New Colors';
  for (let i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = 'block';
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = 'none';
    }
  }
}

//makes newColors a button
newColors.addEventListener('click', function() {
  reset();
});

for (var i = 0; i < modeButtons.length; i++) {
  modeButtons[i].addEventListener('click', function() {
    modeButtons[0].classList.remove('selected');
    modeButtons[1].classList.remove('selected');
    this.classList.add('selected');
    this.textContent === 'Easy' ? (numColors = 3) : (numColors = 6);
    reset();
  });
}
