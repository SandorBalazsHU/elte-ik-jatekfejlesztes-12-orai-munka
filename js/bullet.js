class Bullet extends fw.EntityWithBody {
    constructor(x, y, xs) {
        super(x, y);
        this.image = Bullet.image;
        this.xs = xs;
        this.hp = 100;
    }

    add() {
        this.body = world.createBody(Bullet.bodyDef);
        this.body.createFixture(Bullet.fixtureDef);
        this.body.setPosition(planck.Vec2(this.x / PTM, this.y / PTM));
        this.body.setLinearVelocity(planck.Vec2(this.xs, 0));
        this.body.setAngle(45 / 180 * Math.PI);
        this.body.setUserData(this);
    }

    remove() {
        world.destroyBody(this.body);
    }

    update() {
        if (this.hp < 0) {
            scene.remove(this);
        } else {
            this.alpha = this.hp / 100;
        }

    }

    contact(body) {
        const velocity = this.body.getLinearVelocity().clone();
        velocity.sub(body.getLinearVelocity());

        this.hp -= velocity.length();
    }
}

Bullet.events = ['add', 'remove', 'contact', 'update'];

Bullet.bodyDef = {
    type: 'dynamic'
};
Bullet.fixtureDef = {
    shape: fw.Box(1, 1),
    restitution: 0.6,
    friction: 0.8,
    density: 1,
    filterCategoryBits: CATEGORIES.BULLET,
    filterMaskBits: CATEGORIES.WALL | CATEGORIES.ENEMY
};

Bullet.image = fw.image('images/bullet.png');