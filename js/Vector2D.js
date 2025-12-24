// Vector2D - From SDL Book Chapter 4
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    multiply(scalar) {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    divide(scalar) {
        if (scalar !== 0) {
            return new Vector2D(this.x / scalar, this.y / scalar);
        }
        return new Vector2D(0, 0);
    }

    length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    normalize() {
        const len = this.length();
        if (len > 0) {
            return this.divide(len);
        }
        return new Vector2D(0, 0);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }

    clone() {
        return new Vector2D(this.x, this.y);
    }

    getX() { return this.x; }
    getY() { return this.y; }
    setX(x) { this.x = x; }
    setY(y) { this.y = y; }
}