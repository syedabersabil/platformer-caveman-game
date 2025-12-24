// Collectible Coin
class Coin extends GameObject {
    constructor(x, y) {
        super();
        this.position.set(x, y);
        this.width = 20;
        this.height = 20;
        this.collected = false;
        this.animFrame = 0;
    }

    update() {
        this.animFrame = (this.animFrame + 0.1) % (Math.PI * 2);
    }

    draw(ctx, camera) {
        if (this.collected) return;

        const cameraPos = camera.getPosition();
        const x = this.position.x - cameraPos.x + this.width / 2;
        const y = this.position.y - cameraPos.y + this.height / 2;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(this.animFrame);
        
        // Coin
        ctx.fillStyle = '#FFD700';
        ctx.beginPath();
        ctx.arc(0, 0, 10, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner circle
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.arc(0, 0, 6, 0, Math.PI * 2);
        ctx.fill();
        
        // Dollar sign
        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('$', 0, 0);
        
        ctx.restore();
    }

    collect() {
        this.collected = true;
        this.isDead = true;
    }
}