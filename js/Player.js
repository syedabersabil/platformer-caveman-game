// Player - Caveman character from SDL Book Chapter 9
class Player extends PlatformerObject {
    constructor(x, y) {
        super();
        this.position.set(x, y);
        this.width = 28;
        this.height = 32;
        this.lives = 3;
        this.score = 0;
        this.isRunning = false;
        this.facingRight = true;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.animFrame = 0;
        this.animTimer = 0;
    }

    handleInput() {
        this.velocity.x = 0;
        this.isRunning = false;

        // Movement
        if (this.keys['ArrowLeft']) {
            this.isRunning = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
            this.velocity.x = this.isRunning ? -this.runSpeed : -this.moveSpeed;
            this.facingRight = false;
        } else if (this.keys['ArrowRight']) {
            this.isRunning = this.keys['ShiftLeft'] || this.keys['ShiftRight'];
            this.velocity.x = this.isRunning ? this.runSpeed : this.moveSpeed;
            this.facingRight = true;
        }

        // Jumping
        if (this.keys['Space'] && this.canJump && !this.isJumping) {
            this.velocity.y = this.jumpForce;
            this.isJumping = true;
            this.canJump = false;
            this.isGrounded = false;
        }
    }

    update() {
        this.handleInput();
        this.updatePosition();

        // Update invincibility
        if (this.invincibleTimer > 0) {
            this.invincibleTimer--;
            if (this.invincibleTimer === 0) {
                this.invincible = false;
            }
        }

        // Animation
        this.animTimer++;
        if (this.animTimer > 8) {
            this.animFrame = (this.animFrame + 1) % 4;
            this.animTimer = 0;
        }
    }

    draw(ctx, camera) {
        const cameraPos = camera.getPosition();
        const x = this.position.x - cameraPos.x;
        const y = this.position.y - cameraPos.y;

        // Blink when invincible
        if (this.invincible && Math.floor(Date.now() / 100) % 2 === 0) {
            return;
        }

        ctx.save();
        
        // Draw caveman
        ctx.fillStyle = '#FFE4B5';
        
        // Head
        ctx.beginPath();
        ctx.arc(x + this.width / 2, y + 8, 8, 0, Math.PI * 2);
        ctx.fill();
        
        // Hair
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x + this.width / 2 - 8, y + 2, 16, 6);
        
        // Body
        ctx.fillStyle = '#FFE4B5';
        ctx.fillRect(x + this.width / 2 - 6, y + 16, 12, 10);
        
        // Legs
        ctx.fillRect(x + this.width / 2 - 8, y + 26, 5, 6);
        ctx.fillRect(x + this.width / 2 + 3, y + 26, 5, 6);
        
        // Arms
        if (this.velocity.x !== 0) {
            // Animated arms when moving
            const armSwing = Math.sin(this.animFrame) * 3;
            ctx.fillRect(x + this.width / 2 - 10, y + 16 + armSwing, 4, 8);
            ctx.fillRect(x + this.width / 2 + 6, y + 16 - armSwing, 4, 8);
        } else {
            ctx.fillRect(x + this.width / 2 - 10, y + 16, 4, 8);
            ctx.fillRect(x + this.width / 2 + 6, y + 16, 4, 8);
        }
        
        // Club
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(x + this.width / 2 + (this.facingRight ? 8 : -12), y + 14, 4, 12);
        ctx.fillRect(x + this.width / 2 + (this.facingRight ? 8 : -14), y + 12, 6, 4);

        ctx.restore();
    }

    collision() {
        this.lives--;
        this.invincible = true;
        this.invincibleTimer = 120;
        this.position = this.lastSafePos.clone();
        this.velocity.set(0, 0);
        
        if (this.lives <= 0) {
            this.isDead = true;
        }
    }

    collectCoin() {
        this.score += 10;
    }

    setKeys(keys) {
        this.keys = keys;
    }
}