// Main Game Class - SDL Book Architecture
class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 800;
        this.canvas.height = 600;
        
        this.tileSize = 32;
        this.mapWidth = 1600; // 50 tiles
        this.mapHeight = 600; // 19 tiles
        
        this.tileMap = new TileMap(this.tileSize, this.mapWidth, this.mapHeight);
        this.camera = new Camera(this.mapWidth, this.mapHeight, 800, 600);
        TheCamera.mapWidth = this.mapWidth;
        TheCamera.mapHeight = this.mapHeight;
        TheCamera.viewWidth = 800;
        TheCamera.viewHeight = 600;
        
        this.player = new Player(100, 400);
        this.enemies = [];
        this.coins = [];
        this.keys = {};
        
        this.setupInput();
        this.spawnObjects();
        
        this.player.setCollisionTiles(this.tileMap.getCollisionTiles());
        this.camera.setTarget(this.player);
        this.player.setKeys(this.keys);
    }

    setupInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
                e.preventDefault();
            }
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    spawnObjects() {
        // Spawn enemies on platforms
        this.enemies.push(new Enemy(250, 400));
        this.enemies.push(new Enemy(600, 300));
        this.enemies.push(new Enemy(900, 400));
        this.enemies.push(new Enemy(1200, 250));
        
        for (let enemy of this.enemies) {
            enemy.setCollisionTiles(this.tileMap.getCollisionTiles());
        }

        // Spawn coins
        for (let i = 0; i < 20; i++) {
            const x = 200 + i * 60;
            const y = 200 + Math.sin(i) * 100;
            this.coins.push(new Coin(x, y));
        }
    }

    update() {
        if (this.player.isDead) {
            this.gameOver();
            return;
        }

        // Update player
        this.player.update();

        // Update camera
        this.camera.setTarget(this.player);
        this.camera.update();

        // Update enemies
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            this.enemies[i].update();
            
            if (this.enemies[i].isDead) {
                this.enemies.splice(i, 1);
                continue;
            }

            // Check player-enemy collision
            if (!this.player.invincible && CollisionManager.checkAABB(
                this.player.getRect(),
                this.enemies[i].getRect(),
                2
            )) {
                this.player.collision();
            }
        }

        // Update and collect coins
        for (let coin of this.coins) {
            coin.update();
            
            if (!coin.collected && CollisionManager.checkAABB(
                this.player.getRect(),
                coin.getRect()
            )) {
                coin.collect();
                this.player.collectCoin();
            }
        }

        // Update HUD
        this.updateHUD();
    }

    render() {
        // Clear screen
        this.ctx.fillStyle = '#87CEEB';
        this.ctx.fillRect(0, 0, 800, 600);

        // Draw sky gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, 600);
        gradient.addColorStop(0, '#87CEEB');
        gradient.addColorStop(1, '#E0F6FF');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, 800, 600);

        // Draw clouds
        this.drawClouds();

        // Draw tilemap
        this.tileMap.draw(this.ctx, this.camera);

        // Draw coins
        for (let coin of this.coins) {
            coin.draw(this.ctx, this.camera);
        }

        // Draw enemies
        for (let enemy of this.enemies) {
            enemy.draw(this.ctx, this.camera);
        }

        // Draw player
        this.player.draw(this.ctx, this.camera);
    }

    drawClouds() {
        const cameraPos = this.camera.getPosition();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        
        for (let i = 0; i < 5; i++) {
            const x = (i * 300 - cameraPos.x * 0.3) % 1000;
            const y = 50 + i * 30;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, 20, 0, Math.PI * 2);
            this.ctx.arc(x + 25, y, 25, 0, Math.PI * 2);
            this.ctx.arc(x + 50, y, 20, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    updateHUD() {
        document.getElementById('lives').textContent = this.player.lives;
        document.getElementById('score').textContent = this.player.score;
        document.getElementById('level').textContent = '1';
    }

    gameOver() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, 800, 600);
        
        this.ctx.fillStyle = '#FF0000';
        this.ctx.font = 'bold 72px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('GAME OVER', 400, 300);
        
        this.ctx.fillStyle = '#FFF';
        this.ctx.font = '24px Arial';
        this.ctx.fillText(`Final Score: ${this.player.score}`, 400, 360);
        this.ctx.fillText('Refresh to Restart', 400, 400);
    }

    run() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.run());
    }
}

const TheGame = new Game();