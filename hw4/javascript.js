function eligible(age, state, filed, dependents) {
  if (age > 60 && (state.toUpperCase() === 'WI' || state.toUpperCase() === 'IA') && filed == true && (dependents >= 1 && dependents <= 5)) {
    return true;
  } else {
    return false;
  }
}

function oddlyEven(data) {
  var t;
  var p = 0;
  var toReturn = '';
  //type is String, return number value
  if (typeof data === 'string' && (data.charAt(0) === '*' || data.charAt(0) === '#')) {
    t = data.split(':');
    t.forEach(x => {
      if (x === '*') {
        toReturn += '0';
      } else if (x === '#') {
        toReturn += '1';
      } else if (x === '**') {
        toReturn += '2';
      } else if (x === '##') {
        toReturn += '3';
      } else if (x === '***') {
        toReturn += '4';
      } else if (x === '###') {
        toReturn += '5';
      } else if (x === '****') {
        toReturn += '6';
      } else if (x === '####') {
        toReturn += '7';
      } else if (x === '*****') {
        toReturn += '8';
      } else if (x === '#####') {
        toReturn += '9';
      } else {
        p = 1;
      }
    })
    //type is Number, convert to oddlyEven String
  } else if (typeof data === 'number' && data >= 0) {
    var i = 0;
    t = String(data);
    t = t.split('');
    t.forEach(x => {
      if (x == '0') {
        toReturn += '*';
      } else if (x == '1') {
        toReturn += '#';
      } else if (x == '2') {
        toReturn += '**';
      } else if (x == '3') {
        toReturn += '##';
      } else if (x == '4') {
        toReturn += '***';
      } else if (x == '5') {
        toReturn += '###';
      } else if (x == '6') {
        toReturn += '****';
      } else if (x == '7') {
        toReturn += '####';
      } else if (x == '8') {
        toReturn += '*****';
      } else if (x == '9') {
        toReturn += '#####';
      } else {
        p = 1;
      }
      i++;
      if (i != t.length) {
        toReturn += ':';
      }
    })
  }
  if (p === 1) {
    return undefined;
  }
  if (typeof data === 'string' && (data.charAt(0) === '*' || data.charAt(0) === '#')) {
    return Number(toReturn);
  } else if (typeof data === 'number' && data >= 0) {
    return toReturn;
  } else {
    return undefined;
  }
}

function lettersNearby(text, key, offset) {
  var i, j, occurences = [], result = [];
  var k = 0;
  var t = 0;
  text = text.toLowerCase();
  key = key.toLowerCase();

  if (text.length == 1) {
    return text[0];
  }

  for (i = 0; i < text.length; i++) {
    for (j = i + 1; j < text.length; j++) {
      if (text.slice(i, j) === key) {
        occurences[k++] = j - 1;
      }
    }
  }
  k = 0;
  if (offset >= 0) {
    for (i = 0; i < occurences.length; i++) {
      for (j = occurences[i]; j < text.length; j++) {
        if (t++ == offset) {
          if (result.indexOf(text[j]) < 0) {
            result[k++] = text[j];
          }
          break;
        }
        if (j + 1 == text.length) {
          j = 0;
        }
      }
      t = 0;
    }
  } else {
    for (i = 0; i < occurences.length; i++) {
      for (j = occurences[i]; j >= 0; j--) {
        if (t-- == offset) {
          if (result.indexOf(text[j]) < 0) {
            if (j - 1 == -1) {
              j = text.length - 1;
            }
            result[k++] = text[j - 1];
          }
          break;
        }
        if (j - 1 == -1) {
          j = text.length - 1;
        }
      }
      t = 0;
    }
  }
  return result.toString();

}

function props(list, propertyName) {
  var result = [];
  list.filter(x => {
    if (x[propertyName]) { result.push(x[propertyName]) }
    else {
      result.push(undefined);
    }
  })
  return result;
}

function listify(item, listType) {
  var result = '';
  var i = 0;
  item = item.toString();
  item = item.split('');

  if (item.length == 0) {
    result = '<ul></ul>';
  } else {
    if (listType == 'ol') {
      result += '<ol>';
    } else {
      result += '</ol>';
    }

    for (i; i < item.length; i++) {
      if (item[i] != ',') {
        result += '<li>' + item[i] + '</li>';
      }
    }

    if (listType == 'ol') {
      result += '</ol>';
    } else {
      result += '</ul>';
    }


  }
  return result;
}

var times = 0;
function sequence(start, step) {
  return function () { return start + step * (times++); };
}

function repeat(text, n) {
  var result = '';
  var i = 0;

  if (n <= 0) {
    return result;
  } else {
    for (i; i < n; i++) {
      result += text;
    }
  }
  return result;
}

function repeatf(f, n) {
  result = [];
  for (var i = 0; i < n; i++) {
    result.push(repeat(f(), 1));
  }
  return result;
}

function matchmaker(obj) {
  return function (input) {
    var num = 0;
    var i = 0;
    obj = Object.values(obj);
    input = Object.values(input);
    for (i; i < input.length; i++) {
      if (input.indexOf(obj[i]) >= 0) {
        num++;
      }
    }
    if (num == obj.length) {
      return true;
    } else {
      return false;
    }
  }
}


function breakup(list, partitioner) {
  var result = {};
  var r1 = [];
  var r2 = [];
  
  for (var i = 0; i < list.length; i++) {
    if (result.hasOwnProperty(partitioner(list[i]))) {
      r1 = r1.push(list[i]);
      result[partitioner(list[i])] = r1;
    } else {
      result = { [partitioner(list[i])]: [list[i]] };
    }
  }
  return result;
}

function none(list, predicate) {
  var i = 0;
  var t = 0;
  for (i; i < list.length; i++) {
    if (!predicate(list[i])) {
      t++;
    }
  }
  if (t == list.length) {
    return true;
  } else { return false; }
}

function noSql(list, query) {
  var result = [];
  var i;
  list.filter(x => {if(query in x){
    result = result.push(x);
  }})
  return result;
}


var toChoose;
function myChoice(items) {
  var item;
  var num;
  return function (input) {
    if (input != 'rechoose') {
      return toChoose;
    } else {
      num = Math.floor(Math.random() * items.length);
      toChoose = items[num];
      return toChoose;
    }
  }
}