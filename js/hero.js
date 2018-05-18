class Hero extends fw.Entity {
    constructor(x, y) {
        super(x, y);
        this.anim = 0;
        this.cooldown = 0;
    }

    update() {
        if(this.cooldown>0){
            this.cooldown--;
        }

        this.moveIfPressed(37, -10, 0);
        this.moveIfPressed(38, 0, -10);
        this.moveIfPressed(39, 10, 0);
        this.moveIfPressed(40, 0, 10);

        if (fw.isDown(32) && this.cooldown===0) {
            this.cooldown = 10;
            scene.add(new Bullet(this.x, this.y, 20));
        }

        if (fw.isDown(27)) {
            scene.fire('remove');
            scene = new fw.Scene();
            document.getElementById("menu").style.display=null;
        }
    }

    moveIfPressed(key, x, y) {
        if (fw.isDown(key)) {
            const entitiesInWay = index.query(this.getLeft() + x, this.getTop() + y, this.getWidth(), this.getHeight());
            for (const entity of entitiesInWay) {
                if (entity instanceof Wall) {
                    return;
                }
            }

            this.x += x;
            this.y += y;
            this.updateAnim();
        }
    }

    updateAnim() {
        this.anim += 0.5;
        if (this.anim >= 10) {
            this.anim -= 10;
        }
    }

    draw(ctx) {
        ctx.drawImage(Hero.image, this.getImgX(), this.getImgY(), 180, 248, this.x, this.y, 90, 124);
    }


    getImgX() {
        var column = Math.floor(this.anim) % 5;
        return column * 180;
    }

    getImgY() {
        var row = Math.floor(Math.floor(this.anim) / 5);
        return row * 248;
    }

    getWidth() {
        return 90;
    }

    getHeight() {
        return 124;
    }
}

Hero.events = ['update', 'draw'];

Hero.image = fw.image('images/hero.png');