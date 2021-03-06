let ingredients;
let db;

let buttons = [];
let mixes = [];
let choices = [];
let div;
let drinkName;

function preload() {
  // Load Drinknames JSOn from Github
  loadJSON("data/drinkNamesDB.json", function(v) {
    db = v
  });
}


function setup() {
  noCanvas();

  ingredients = db.ingredients;

  let text1 = createP("Wähle bitte hier deine Zutaten aus:");

  // Draw Buttons
  for (let i = 0; i < ingredients.length; i++) {
    buttons[i] = createButton(ingredients[i].name);
    buttons[i].mousePressed(() => {
      if (!choices.includes(i)) {
        choices.push(i);
        prepareDrinknames()
      } else {
        choices.splice(choices.indexOf(i), 1);
        prepareDrinknames()
      }
    });

  }

  createDiv("Der Name deines Drinks ist:");
  drinkName = createDiv("ein großes Glas nix");
}

function draw() {
  colorMode(HSB);
	let fc = frameCount / 10;
  colA = color((fc + 30) % 255, 255, 200);
  colB = color((fc + 110) % 255, 255, 200);
  colC = color((fc + 190) % 255, 255, 200);

  for (let i = 0; i < buttons.length; i++) {
    if (choices.includes(i)) {
      buttons[i].style('background-color', colC);

    } else
      buttons[i].style('background-color', colB);
  }

  select('html').style('background', colA);
}

function prepareDrinknames() {
  // Find chosen ingredients
  for (let i = 0; i < choices.length; i++) {
    mixes.push({
      name: ingredients[choices[i]].name,
      index: choices[i]
    });
  }

  let name = findAName(mixes);	
  drinkName.html(name);
}
function findAName(ingr){
  let name = "ein großes Glas nix";

  // Choose random first word
  if (ingr.length != 0) {
    let main = ingr.shift();
    name = random(ingredients[main.index].word);
  }

  // Choose random Prefix
  if (ingr.length != 0) {
    let side = ingr.shift();
    name = random(ingredients[side.index].prefix) + name;
  }

  // Choose random Suffix for all remaining 
  while (ingr.length != 0) {
    next = ingr.shift();
    name = name + random(ingredients[next.index].suffix);
  }
	
  return name;
}
