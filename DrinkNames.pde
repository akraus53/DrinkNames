JSONArray ingredients;
void setup() {
  colorMode(HSB);
  size(1200,700);

  prepareDrinknames();
}

void draw() {
  background((frameCount/20F)%255, 200, 200);
  
  // Create the Boxes with Text
  float border = 10;
  float headerHeight = height/7;
  
  fill(255);
  textAlign(LEFT, TOP);
  float sizeOfText = headerHeight;
  textSize(sizeOfText);
  
  while (textWidth("MADRID Drink Name Generator")>(width-border)) {
    sizeOfText--;
    textSize(sizeOfText);
    headerHeight = sizeOfText+20;
  }

  
  float boxSizeX = (width-border)/6;
  float boxSizeY = (height-border-headerHeight)/3;

  
  text( "MADRID Drink Name Generator", border, border);


    JSONArray ingredients = loadJSONObject("drinkNamesDB.json").getJSONArray("ingredients");

  
  for (int i = 0; i < ingredients.size(); i++) {
    float x = (i%6)*boxSizeX+border;
    float y = floor(i/6)*boxSizeY+headerHeight+border;
    fill(((frameCount/20F)+120)%255, 200, 200);
    rect(x, y, boxSizeX-border, boxSizeY-border);
    
    String ingredient = ingredients.getJSONObject(i).getString("name");
    fill(255);
    
    sizeOfText = 100;
    textSize(sizeOfText);
  
  while (textWidth(ingredient)>(boxSizeX-2*border)) {
    sizeOfText--;
    textSize(sizeOfText);
    textAlign(LEFT, CENTER);
  }
    
    text(ingredient, x+border,y+(boxSizeY/2F));
  }
}

void prepareDrinknames() {
  JSONArray ingredients = loadJSONObject("drinkNamesDB.json").getJSONArray("ingredients");
  for (int i = 0; i < ingredients.size(); i++) {
  }
}

String findName(String[] choices) {
  String prefix = "";
  String word = "";
  String suffix = "";
  
  return prefix+word+suffix;
}
