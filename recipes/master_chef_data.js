var descs = [
    "Buttermilk pancakes", 
    "Eggs benedict", 
    "Watermelon Jello with Asparagus", 
    "Fennel Cupcakes", 
    "Cajun Tuna", 
    "Beet Salad",
    "Plum Pudding",
    "Pumpkin Spice Trail Mix",
    "Angel food cake", 
    "Polish sausage with red wine", 
    "Hashbrowns", 
    "Pork chops with apple compote", 
    "Belgian Waffle" ];

var ingredients = [ 
    'milk', 
    'egg', 
    'cinnamon', 
    'sugar', 
    'flour', 
    'cream', 
    'bourbon', 
    'red wine', 
    'vinegar', 
    'brown sugar', 
    'corn', 
    'salt', 
    'pepper', 
    'apple', 
    'banana', 
    'onion', 
    'water', 
    'nutmeg', 
    'paprika',
    'jalapeno',
    'orange zest',
    'vanialla',
    'baking powder',
    'whole wheat flour',
    'pumpkin seeds',
    'cucumber',
    'sour cream', 
    'cream cheese', 
    'cream of mushroom', 
    'brocolli', 
    'hamburger', 
    'hot dogs', 
    'kielbasa' ];


var units = ["lb", "tsp", "tbsp", "cup", "pinch", "dash", "unit", "scoop", "can", "stem" ];

var urls = ['https://upload.wikimedia.org/wikipedia/commons/d/d7/Banana_on_pancake.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/2/2b/Eggs_benedict.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/d/da/Kielbasa5.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/2/2b/Pork_chops_167541218.jpg',
            'https://upload.wikimedia.org/wikipedia/commons/6/6c/Gaufre_biscuit.jpg'
           ];

var Ingredient = function( desc, units, calories ) {
   this.desc = desc;
   this.amount = Math.floor( Math.random() * 10 + 1);
   this.units = units;
   this.calories = Math.floor( Math.random( ) * 100 );
   this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   } );
};

var repeat = function( f, n ) {
   var result = [];
   for( var i = 0; i < n; i += 1 ){
      result.push( f() );
   }
   return result;
};

var choose = function( vals ) {
   return vals[ Math.floor( Math.random() * vals.length ) ];
};

var Recipe = function( name, n, image ) {
   this.name = name;
   this.image = image;
   this.rating = Math.floor( Math.random() * 10 + 1 ) / 2 ; // .5 to 5 stars in 1/2 unit increments   
   this.ingredients = repeat( function() { return new Ingredient( choose( ingredients ), choose( units ) ); }, Math.random() * 8 + 1 );
   this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
   } );
}

var recipes = repeat( function() { return new Recipe( choose( descs), choose( ingredients ), choose( urls) ); }, Math.floor( Math.random() * 20 + 2 ) );


