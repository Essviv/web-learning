/**
 * Created by sunyiwei on 2017/2/8.
 */

"use strict";

function Vector(x, y) {
    this.x = x;
    this.y = y;
}

Vector.prototype.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
};

function Grid(width, height) {
    this.width = width;
    this.height = height;
    this.space = new Array(width * height);
}

Grid.prototype.isInside = function (vector) {
    var x = vector.x;
    var y = vector.y;
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
};

Grid.prototype.get = function (vector) {
    return this.space[vector.x + vector.y * this.width];
};

Grid.prototype.set = function (vector, value) {
    this.space[vector.x + vector.y * this.width] = value;
};

Grid.prototype.toString = function () {
    var result = "";
    for (var i = 0; i < this.height; i++) {
        var tmp = this.space.slice(i * this.width, (i + 1) * this.width);
        result += tmp.join(" ");
        result += "\n";
    }

    return result;
};

Grid.prototype.forEach = function (f, context) {
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
            var value = this.get({x: j, y: i});
            if (value != null) {
                f.call(context, value, new Vector(j, i));
            }
        }
    }
};

function elementForChar(legend, ch) {
    if (ch == " ") {
        return null;
    }

    var element = new legend[ch]();
    element.originChar = ch;
    return element;
}

function charForElement(element) {
    if (element == null) {
        return " ";
    }

    return element.originChar;
}

function World(map, legend) {
    var grid = new Grid(map[0].length, map.length);
    this.grid = grid;
    this.legend = legend;

    map.forEach(function (line, y) {
        for (var i = 0; i < line.length; i++) {
            grid.set(new Vector(i, y), elementForChar(legend, line[i]));
        }
    });
}

World.prototype.toString = function () {
    var result = "";
    for (var i = 0; i < this.grid.height; i++) {
        var tmp = this.grid.space.slice(i * this.grid.width, (i + 1) * this.grid.width);
        result += tmp.map(function (element) {
            return charForElement(element);
        }).join("");
        result += "\n";
    }

    return result;
};

World.prototype.turn = function () {
    var acted = [];
    this.grid.forEach(function (critter, index) {
        if (critter.act && acted.indexOf(critter) == -1) {
            acted.push(critter);
            this.letAct(critter, index);
        }
    }, this);
};

World.prototype.letAct = function (elem, vector) {
    var action = elem.act(new View(this, vector));
    if (action && action.type == "move") {
        var dest = this.checkDestination(action, vector);
        if (dest && this.grid.get(dest) == null) {
            this.grid.set(vector, null);
            this.grid.set(dest, elem);
        }
    }
};

World.prototype.checkDestination = function (action, vector) {
    if (directions.hasOwnProperty(action.direction)) {
        var dest = vector.plus(directions[action.direction]);
        if (this.grid.isInside(dest)) {
            return dest;
        }
    }
};

function Wall() {

}

function View(world, vector) {
    this.world = world;
    this.vector = vector;
}

View.prototype.look = function (dir) {
    var target = this.vector.plus(directions[dir]);
    if (this.world.grid.isInside(target)) {
        return charForElement(this.world.grid.get(target));
    } else {
        return "#";
    }
};

View.prototype.findAll = function (targetCh) {
    return directionNames.map(function (dir) {
        return {ch: this.look(dir), dir: dir};
    }, this).filter(function (elem) {
        return targetCh == elem.ch;
    }).map(function (elem) {
        return elem.dir;
    });
};

View.prototype.find = function (ch) {
    var dirs = this.findAll(ch);
    if (dirs.length == 0) {
        return null;
    }

    return randomElement(dirs);
};

function dirPlus(dir, n) {
    var index = directionNames.indexOf(dir);
    return directionNames[(index + n + 8) % 8];
}

function WallFoller() {
    this.dir = "s";
}

WallFoller.prototype.act = function (view) {
    var start = this.dir;
    if (view.look(dirPlus(start, -3)) != ' ') {
        start = this.dir = dirPlus(start, -2);
    }

    while (view.look(this.dir) != ' ') {
        this.dir = dirPlus(this.dir, 1);
        if (this.dir == start) {
            break;
        }
    }

    return {type: "move", direction: this.dir};
};

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

var directionNames = "n ne e se s sw w nw".split(" ");

function BouncingCritter() {
    this.direction = randomElement(directionNames);
}

BouncingCritter.prototype.act = function (view) {
    if (view.look(this.direction) != ' ') {
        this.direction = view.find(" ") || "s";
    }

    return {type: "move", direction: this.direction};
};

function LifeLikeWorld(map, legend) {
    World.call(this, map, legend);
}

LifeLikeWorld.prototype = Object.create(World.prototype);

var actionTypes = {
    grow: function (elem) {
        elem.energy += 0.5;
        return true;
    },

    move: function (elem, vector, action) {
        var dest = this.grid.checkDestination(action, vector);
        if (!dest
            || elem.energy <= 1
            || this.grid.get(dest) != null) {
            return false;
        }

        elem.energy -= 1;
        this.grid.set(vector, null);
        this.grid.set(dest, elem);
        return true;
    },

    eat: function (elem, vector, action) {
        var dest = this.grid.checkDestination(action, vector);
        var elemAtDest = !dest && this.grid.get(dest);
        if (!elemAtDest || elemAtDest.energy == null) {
            return false;
        }

        elem.energy += elemAtDest.energy;
        this.grid.set(dest, null);
        return true;
    },

    reproduce: function (elem, vector, action) {
        var baby = elementForChar(this.legend, elem.originChar);
        var dest = this.grid.checkDestination(action, vector);
        if (!dest
            || elem.energy <= 2 * baby.energy
            || this.grid.get(dest) != null) {
            return false;
        }

        elem.energy -= 2 * baby.energy;
        this.grid.set(dest, baby);
        return true;
    }
};

LifeLikeWorld.prototype.letAct = function (elem, vector) {
    var action = elem.act(new View(this, vector));
    var handled = action
        && action.type in actionTypes
        && actionTypes[action.type].call(this, elem, vector, action);

    if (!handled) {
        elem.energy -= 0.2;

        //out of energy
        if (elem.energy <= 0) {
            this.grid.set(vector, null);
        }
    }
};

function Plant() {
    this.energy = 3 + Math.random() * 4;
}

Plant.prototype.act = function (view) {
    if (this.energy > 15) {
        var dir = view.find(" ");
        if (dir) {
            return {type: "reproduce", direction: dir}
        }
    }

    if (this.energy < 20) {
        return {type: "grow"}
    }
};

function PlantEater() {
    this.energy = 20;
}

PlantEater.prototype.act = function (view) {
    var space = view.find(" ");
    if (space && this.energy > 60) {
        return {type: "reproduce", direction: space}
    }

    var plant = view.find("*");
    if (plant) {
        return {type: "eat", direction: plant}
    }

    if (space) {
        return {type: "move", direction: space}
    }
};

var directions = {
    "n": new Vector(0, -1),
    "ne": new Vector(1, -1),
    "e": new Vector(1, 0),
    "se": new Vector(1, 1),
    "s": new Vector(0, 1),
    "sw": new Vector(-1, 1),
    "w": new Vector(-1, 0),
    "nw": new Vector(-1, -1)
};


var grid = new Grid(5, 5);
for (var i = 0; i < 5; i++) {
    for (var j = 0; j < 5; j++) {
        var v = new Vector(i, j);
        grid.set(v, "X");
    }
}

console.log(grid.toString());

var plan =
    ["############################",
        "#           #  # o        ##",
        "#    ***                   #",
        "##         ###       ***   #",
        "#     *####*       *       #",
        "# ##   ##                  #",
        "#     #      # o           #",
        "#     o #     o   #***#### #",
        "#    ***                   #",
        "###        ***          ## #",
        "# # #         #*   o     # #",
        "##           o       #   # #",
        "############################"];

var world = new World(plan, {
    "#": Wall,
    "o": PlantEater,
    "*": Plant
});
console.log(world.toString());

for (var i = 0; i < 10; i++) {
    world.turn();
    console.log(world.toString());
}


//test vector.plus
function testVectorPlus() {
    var p1 = new Vector(10, 20);
    var p2 = new Vector(23, 35);
    var p3 = p1.plus(p2);

    if (p3.x != 33) {
        return "error: x from plus";
    }
    if (p3.y != 55) {
        return "error: y from plus";
    }
    if (p1.x != 10) {
        return "error: x property";
    }
    if (p1.y != 20) {
        return "error: y property";
    }
    if (p2.x != 23) {
        return "error: x property";
    }
    if (p2.y != 35) {
        return "error: y property";
    }

    return "everything is ok.";
}

console.log(testVectorPlus());

//测试正则表达式
var reg1 = new RegExp("abc");
console.log(reg1.test("fdsabcde"));
console.log(reg1.test("fdsacde"));

var reg2 = /[0123456789]/;
console.log(reg2.test('hello world 2'));
console.log(reg2.test('hello world'));

var reg3 = /[a-z]/;
console.log(reg3.test('34344h'));
console.log(reg3.test('34344'));

var reg4 = /\d/;
console.log(reg4.test('fdksfd'));
console.log(reg4.test('fdksfdf3'));

var reg5 = /\s/;
console.log(reg5.test("fdsafdsa fdjskj"));
console.log(reg5.test("fdsafdsa     fdjskj"));
console.log(reg5.test("fdsafdsa_fdjskj"));

var reg6 = /\S/;
console.log(reg6.test("     "));
console.log(reg6.test("  i  "));

var reg7 = /./;
console.log(reg7.test("\n\n\n\n"));
console.log(reg7.test("\nfd"));

var reg8 = /\D/;
console.log(reg8.test("343434"));
console.log(reg8.test("343434d"));

var dateReg = /\d\d\d\d-\d\d-\d\d \d\d:\d\d/;
console.log(dateReg.test("2017-02-03 15:00"));
console.log(dateReg.test("2017-02-03T15:00"));

var reg9 = /[\d.+?]/;
console.log(reg9.test("43433."));
console.log(reg9.test("43433?"));
console.log(reg9.test("43433+"));
console.log(reg9.test("DSDDSx"));

var reg10 = /neighbou?r/;
console.log(reg10.test('neighbour'));
console.log(reg10.test('neighbor'));

var reg11 = /\d*/;
console.log(reg11.test("fdsafdsad"));
console.log(reg11.test("fdsafd34342i"));

var reg12 = /abc\d+/;
console.log(reg12.test("343abc343"));
console.log(reg12.test("343abc"));

var reg13 = /1[3578]\d{9}/; //mobile
console.log(reg13.test("18432421234"));
console.log(reg13.test("1843241234"));
console.log(reg13.test("14843241234"));

var improvedDate = /\d{4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}/;
console.log(improvedDate.test("2017-12-01 1:2:3"));
console.log(improvedDate.test("2017-12-01 12:2:3"));
console.log(improvedDate.test("2017-12-1 12:2:3"));
console.log(improvedDate.test("2017-12-1 12:2:3"));

var reg15 = /'([^']*)'/;
console.log(reg15.exec("I said 'hello'"));

var reg16 = /(\d)+/;
console.log(reg16.exec('one two 100 234'));

function findDate(str) {
    var dateReg = /^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var match = dateReg.exec(str);
    if (match) {
        return new Date(Number(match[1]),
            Number(match[2]) - 1,
            Number(match[3]),
            Number(match[4]),
            Number(match[5]),
            Number(match[6]));
    }
}

console.log(findDate("2017-02-03 13:29:39"));
console.log(findDate("s2017-02-03 13:29:39"));

var reg17 = /cat/;
console.log(reg17.test("concatenate"));
console.log(reg17.test("dsdf cat dfs"));

var reg18 = /\bcat\b/;
console.log(reg18.test("concatenate"));
console.log(reg18.test("dsdf cat dfs"));

var reg19 = /\b\d+\s(pig|cow|duck)s?\b/;
console.log(reg19.test('15pigs'));
console.log(reg19.test('15 pigs'));
console.log(reg19.test('15 cows'));
console.log(reg19.test('15 ducks'));
console.log(reg19.test('1 duck'));
console.log(reg19.test('duck'));

var reg20 = /\b([01]+b|\d+|[\da-f]+h)\b/;
console.log(reg20.test("3434343"));
console.log(reg20.test("0101010100111b"));
console.log(reg20.test("24323141413abe2343fh"));
console.log(reg20.test("24323141413abe2343gh"));

var reg21 = /g/g;
var reg22 = /g/;
var ori = 'google';
console.log(ori.replace(reg21, 'k'));
console.log(ori.replace(reg22, 'k'));

var testStr = '1  apple, 13 lemons, 5 watermelons.';
var reg24 = /(\d+)\s+(\w+)/g;
console.log(testStr.replace(reg24, function(match, count, unit){
    var newCount = Number(count) - 1;
    if(newCount == 0){
        newCount = 'no';
    }

    if(newCount == 1){
        unit = unit.slice(0, unit.length - 1);
    }

    return newCount + " " + unit;
}));

var stripComment = /\/\/.*|\/\*[^]*\*\//g;
console.log('var x = 10; //assign x'.replace(stripComment, ""));
console.log('var x /* nonsense comment */ = 10;'.replace(stripComment, ""));

var stripCommentNoGreedy = /\/\/.*|\/\*[^]*?\*\//g;
console.log(' 1 /* nonsense */ + /* nonsense */ 1'.replace(stripComment, "") );
console.log(' 1 /* nonsense */ + /* nonsense */ 1'.replace(stripCommentNoGreedy, "") );
