/**
 * Created by sunyiwei on 2017/2/8.
 */

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
