// TileMap - Inspired by SDL Book Chapter 7
class TileMap {
    constructor(tileSize, mapWidth, mapHeight) {
        this.tileSize = tileSize;
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.tiles = [];
        this.collisionTiles = [];
        this.createMap();
    }

    createMap() {
        // Create a platformer level
        const rows = this.mapHeight / this.tileSize;
        const cols = this.mapWidth / this.tileSize;

        for (let row = 0; row < rows; row++) {
            this.tiles[row] = [];
            for (let col = 0; col < cols; col++) {
                // Ground at bottom
                if (row >= rows - 3) {
                    this.tiles[row][col] = 1; // Grass/ground
                    this.collisionTiles.push({ x: col * this.tileSize, y: row * this.tileSize, width: this.tileSize, height: this.tileSize });
                }
                // Platforms
                else if (row === Math.floor(rows * 0.7) && col >= 5 && col <= 10) {
                    this.tiles[row][col] = 2; // Platform
                    this.collisionTiles.push({ x: col * this.tileSize, y: row * this.tileSize, width: this.tileSize, height: this.tileSize });
                }
                else if (row === Math.floor(rows * 0.5) && col >= 15 && col <= 20) {
                    this.tiles[row][col] = 2;
                    this.collisionTiles.push({ x: col * this.tileSize, y: row * this.tileSize, width: this.tileSize, height: this.tileSize });
                }
                else if (row === Math.floor(rows * 0.6) && col >= 25 && col <= 28) {
                    this.tiles[row][col] = 2;
                    this.collisionTiles.push({ x: col * this.tileSize, y: row * this.tileSize, width: this.tileSize, height: this.tileSize });
                }
                else if (row === Math.floor(rows * 0.4) && col >= 32 && col <= 37) {
                    this.tiles[row][col] = 2;
                    this.collisionTiles.push({ x: col * this.tileSize, y: row * this.tileSize, width: this.tileSize, height: this.tileSize });
                }
                else if (row === Math.floor(rows * 0.55) && col >= 42 && col <= 46) {
                    this.tiles[row][col] = 2;
                    this.collisionTiles.push({ x: col * this.tileSize, y: row * this.tileSize, width: this.tileSize, height: this.tileSize });
                }
                else {
                    this.tiles[row][col] = 0; // Empty
                }
            }
        }
    }

    draw(ctx, camera) {
        const cameraPos = camera.getPosition();
        const startCol = Math.floor(cameraPos.x / this.tileSize);
        const endCol = Math.min(startCol + Math.ceil(800 / this.tileSize) + 1, this.mapWidth / this.tileSize);
        const startRow = Math.floor(cameraPos.y / this.tileSize);
        const endRow = Math.min(startRow + Math.ceil(600 / this.tileSize) + 1, this.mapHeight / this.tileSize);

        for (let row = startRow; row < endRow; row++) {
            for (let col = startCol; col < endCol; col++) {
                const tileType = this.tiles[row][col];
                if (tileType !== 0) {
                    const x = col * this.tileSize - cameraPos.x;
                    const y = row * this.tileSize - cameraPos.y;

                    ctx.save();
                    if (tileType === 1) {
                        // Grass/Ground
                        ctx.fillStyle = '#2d5016';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.fillStyle = '#3d6b1b';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize / 4);
                    } else if (tileType === 2) {
                        // Platform
                        ctx.fillStyle = '#8B4513';
                        ctx.fillRect(x, y, this.tileSize, this.tileSize);
                        ctx.strokeStyle = '#654321';
                        ctx.lineWidth = 2;
                        ctx.strokeRect(x, y, this.tileSize, this.tileSize);
                    }
                    ctx.restore();
                }
            }
        }
    }

    getCollisionTiles() {
        return this.collisionTiles;
    }
}