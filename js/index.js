var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

fw.load([Hero.image, Wall.image], function () {
    setInterval(update, 16);
});

// world
const world = new planck.World(new planck.Vec2(0, 10));

var scene = new fw.Scene();



function gameStart() {
    scene = new fw.Scene(
    new Hero(160, 130),
    new Wall(0, 100),
    new Wall(0, 200),
    new Wall(0, 300),
    new Wall(100, 0),
    new Wall(200, 0),
    new Wall(300, 0),
    new Wall(400, 0),
    new Wall(100, 400),
    new Wall(200, 400),
    new Wall(300, 400),
    new Wall(400, 400),
    new Wall(500, 100),
    new Wall(500, 200),
    new Wall(500, 300),)
    document.getElementById("menu").style.display="none";
}
document.getElementById("newGame").addEventListener("click", gameStart);
document.getElementById("exit").addEventListener("click", function(){window.close();});




world.on('pre-solve', function (contact) {
    var b1 = contact.getFixtureA().getBody();
    var b2 = contact.getFixtureB().getBody();

    scene.fireToEntity(b1.getUserData(), 'contact', b2);
    scene.fireToEntity(b2.getUserData(), 'contact', b1);
});


var index;

function update() {
    index = fw.createIndex(scene);


    world.step(1 / 60, 5, 5);
    scene.fire('update');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    scene.fire('draw', ctx);
}
