// Enemy - Hostile creatures
class Enemy extends PlatformerObject {
    constructor(x, y) {
        super();
        this.position.set(x, y);
        this.width = 28;
        this.height = 28;
        this.velocity.x = 2;
        this.direction = 1;
        this.animFrame = 0;
        this.animTimer = 0;
    }

    update() {
        // Patrol movement
        this.updatePosition();

        // Reverse direction on collision
        if (this.velocity.x === 0) {
            this.direction *= -1;
            this.velocity.x = 2 * this.direction;
        }

        // Animation
        this.animTimer++;
        if (this.animTimer > 10) {
            this.animFrame = (this.animFrame + 1) % 2;
            this.animTimer = 0;
        }
    }

    draw(ctx, camera) {
        const cameraPos = camera.getPosition();
        const x = this.position.x - cameraPos.x;
        const y = this.position.y - cameraPos.y;

        ctx.save();
        
        // Draw enemy (simple creature)
        ctx.fillStyle = '#8B0000';
        
        // Body
        ctx.fillRect(x + 4, y + 8, 20, 16);
        
        // Eyes
        ctx.fillStyle = '#FFFF00';
        ctx.fillRect(x + 8, y + 12, 4, 4);
        ctx.fillRect(x + 16, y + 12, 4, 4);
        
        // Legs (animated)
        ctx.fillStyle = '#8B0000';
        if (this.animFrame === 0) {
            ctx.fillRect(x + 6, y + 24, 6, 4);
            ctx.fillRect(x + 16, y + 24, 6, 4);
        } else {
            ctx.fillRect(x + 8, y + 24, 6, 4);
            ctx.fillRect(x + 14, y + 24, 6, 4);
        }

        ctx.restore();
    }

    collision() {
        this.isDead = true;
    }
}