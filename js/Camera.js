// Camera class - From SDL Book Chapter 9
class Camera {
    constructor(mapWidth, mapHeight, viewWidth, viewHeight) {
        this.position = new Vector2D(0, 0);
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
        this.target = null;
    }

    setTarget(target) {
        this.target = target;
    }

    update() {
        if (this.target) {
            // Center camera on target
            let targetX = this.target.position.x - this.viewWidth / 2 + this.target.width / 2;
            let targetY = this.target.position.y - this.viewHeight / 2 + this.target.height / 2;

            // Clamp camera to map boundaries
            if (targetX < 0) targetX = 0;
            if (targetY < 0) targetY = 0;
            if (targetX > this.mapWidth - this.viewWidth) {
                targetX = this.mapWidth - this.viewWidth;
            }
            if (targetY > this.mapHeight - this.viewHeight) {
                targetY = this.mapHeight - this.viewHeight;
            }

            // Smooth camera movement
            this.position.x += (targetX - this.position.x) * 0.1;
            this.position.y += (targetY - this.position.y) * 0.1;
        }
    }

    getPosition() {
        return this.position.clone();
    }
}

const TheCamera = new Camera(0, 0, 800, 600);