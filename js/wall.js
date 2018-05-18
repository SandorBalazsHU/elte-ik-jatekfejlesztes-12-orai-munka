
class Wall extends fw.EntityWithBody {
    constructor(x, y) {
        super(x, y);
        this.image = Wall.image;
        this.body = world.createBody(Wall.bodyDef);
        this.body.createFixture(Wall.fixtureDef);
        this.body.setPosition(planck.Vec2(x / PTM, y / PTM));
    }
}
Wall.fixtureDef = {
    shape: fw.Box(128 / PTM, 128 / PTM),
    restitution: 0,
    friction: 1,
    density: 1,
    filterCategoryBits: CATEGORIES.WALL
};
Wall.bodyDef = {
    type: 'static'
};

Wall.image = fw.image('images/wall.jpg');
