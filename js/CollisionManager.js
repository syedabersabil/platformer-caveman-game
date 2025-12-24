// Collision Manager - From SDL Book Chapter 8 & 9
class CollisionManager {
    static checkAABB(rect1, rect2, buffer = 0) {
        return rect1.x + buffer < rect2.x + rect2.width - buffer &&
               rect1.x + rect1.width - buffer > rect2.x + buffer &&
               rect1.y + buffer < rect2.y + rect2.height - buffer &&
               rect1.y + rect1.height - buffer > rect2.y + buffer;
    }

    static checkTileCollision(object, tiles) {
        const objRect = object.getRect();
        
        for (let tile of tiles) {
            if (this.checkAABB(objRect, tile, 2)) {
                return tile;
            }
        }
        return null;
    }

    static checkTileCollisionAtPosition(position, width, height, tiles) {
        const rect = {
            x: position.x,
            y: position.y,
            width: width,
            height: height
        };

        for (let tile of tiles) {
            if (this.checkAABB(rect, tile, 2)) {
                return true;
            }
        }
        return false;
    }
}