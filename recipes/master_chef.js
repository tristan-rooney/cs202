/*Author: Tristan Rooney
  Last Modified @ 11:19pm Nov 19th 2018
*/
function createRecipes(recipes) {
    var node = document.getElementById('recipeWrapper');
    var name, image, id, rating;
    recipes.forEach(x => {
        name = x['name'];
        image = x['image'];
        id = x['id'];
        rating = Math.round(x['rating']);
        node.appendChild(generateList(name, image, id, rating, x['ingredients']));
    })
}

function generateList(name, image, id, rating, ingredients) {
    var section = document.createElement('section');
    var h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(name));
    section.appendChild(h2);
    section.setAttribute('id', id);

    for (var i = 0; i < rating; i++) {
        var star = document.createElement('img');
        star.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Star_red.svg');
        star.setAttribute('class','star');
        h2.appendChild(star);
    }

    var img = document.createElement('img');
    var src = document.createAttribute('src');
    img.appendChild(document.createTextNode(image));
    img.setAttribute('src', image);
    img.setAttribute('class','food');
    section.appendChild(img);

    var ol = document.createElement('ul');
    section.appendChild(ol);
    var li;
    var calories;

    ingredients.forEach(x => {
        calories = x['calories'];
        li = document.createElement('li');
        li.appendChild(document.createTextNode(x['desc'] + " " + x['units'] + " " + x['amount']));
        ol.appendChild(li);
    })
    var t = document.createElement('span');
    t.appendChild(document.createTextNode("Total Calories: " + calories));
    t.setAttribute('class','cal');
    ol.appendChild(t);
    return section;

}