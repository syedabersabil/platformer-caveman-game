// Abstract GameObject - From SDL Book Chapter 3
class GameObject {
    constructor() {
        this.position = new Vector2D();
        this.velocity = new Vector2D();
        this.acceleration = new Vector2D();
        this.width = 32;
        this.height = 32;
        this.isDead = false;
        this.isUpdating = true;
    }

    update() {
        // To be overridden
    }

    draw(ctx, camera) {
        // To be overridden
    }

    collision() {
        // To be overridden
    }

    getRect() {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.width,
            height: this.height
        };
    }

    clean() {
        // Cleanup
    }
}