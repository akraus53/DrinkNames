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

  let text1 = createP("Deine ausgewählten Zutaten sind: ");

  // Draw Buttons
  for (let i = 0; i < ingredients.length; i++) {
    buttons[i] = createButton(ingredients[i].name);
    buttons[i].mousePressed(() => {
      if (!choices.includes(i)) {
        choices.push(i);
        prepareDrinknames()
      } else {
        choices.pop(choices.indexOf(i));
        prepareDrinknames()
      }
    });
    
    but = createButton("test");
    but.attribute('background-color','#abc');
  }
  

  div = createDiv("- keine -").size(600, 100);
  drinkName = createDiv("ein großes Glas nix");
}

function draw() {
}

function prepareDrinknames() {
  // Find chosen ingredients
  for (let i = 0; i < choices.length; i++) {
    mixes.push({
      name: ingredients[choices[i]].name,
      index: choices[i]
    });

  }

  let zutatenString = "";
  if (mixes.length == 0) {
    zutatenString = "- keine -";
    drinkName.html("ein großes Glas nix");
  }

  for (let i = 0; i < mixes.length; i++) {
    zutatenString = zutatenString + mixes[i].name + ", ";
  }

  div.html(zutatenString, false);

  let name = "ein großes Glas nix";

  // Choose random first word
  if (mixes.length != 0) {
    let main = mixes.shift();
    name = random(ingredients[main.index].word);
  }

  // Choose random Prefix
  if (mixes.length != 0) {

    let side = mixes.shift();
    name = random(ingredients[side.index].prefix) + name;
  }

  // Choose random Suffix for all remaining 
  while (mixes.length != 0) {
    next = mixes.shift();

    name = name + random(ingredients[next.index].suffix);
  }
  drinkName.html(name);
}
