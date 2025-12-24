// PlatformerObject - From SDL Book Chapter 9
class PlatformerObject extends GameObject {
    constructor() {
        super();
        this.gravity = 0.6;
        this.maxFallSpeed = 12;
        this.jumpForce = -12;
        this.moveSpeed = 3;
        this.runSpeed = 5;
        this.isJumping = false;
        this.isFalling = true;
        this.isGrounded = false;
        this.canJump = false;
        this.lastSafePos = new Vector2D();
        this.collisionTiles = [];
    }

    setCollisionTiles(tiles) {
        this.collisionTiles = tiles;
    }

    applyGravity() {
        if (!this.isGrounded) {
            this.velocity.y += this.gravity;
            if (this.velocity.y > this.maxFallSpeed) {
                this.velocity.y = this.maxFallSpeed;
            }
            this.isFalling = true;
        }
    }

    checkTileCollision(newPos) {
        return CollisionManager.checkTileCollisionAtPosition(
            newPos,
            this.width,
            this.height,
            this.collisionTiles
        );
    }

    updatePosition() {
        // Apply gravity
        this.applyGravity();

        // Try to move horizontally
        const newX = this.position.clone();
        newX.x += this.velocity.x;
        
        if (!this.checkTileCollision(newX)) {
            this.position.x = newX.x;
        } else {
            this.velocity.x = 0;
        }

        // Try to move vertically
        const newY = this.position.clone();
        newY.y += this.velocity.y;

        if (!this.checkTileCollision(newY)) {
            this.position.y = newY.y;
            this.isGrounded = false;
        } else {
            if (this.velocity.y > 0) {
                // Landing on ground
                this.isGrounded = true;
                this.isFalling = false;
                this.isJumping = false;
                this.canJump = true;
                this.lastSafePos = this.position.clone();
            }
            this.velocity.y = 0;
        }

        // Death check - fell off map
        if (this.position.y > 600) {
            this.collision();
        }
    }
}