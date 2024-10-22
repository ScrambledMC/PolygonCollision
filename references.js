function drawPoint(p01nt) {
    strokeWeight(4);
    point(p01nt.x, p01nt.y);
}


function rotatePoint(point, pivot, rotation) {
    var x = point.x - pivot.x;
    var y = point.y - pivot.y;
    var distance = Math.sqrt(x**2 + y**2);

    var newAngle = Math.atan(y/x) + rotation;
    if (x < 0)
        newAngle += Math.PI;
    var newX = Math.cos(newAngle) * distance;
    var newY = Math.sin(newAngle) * distance;

    return {
        x: pivot.x + newX,
        y: pivot.y + newY
    };
}


function movePointAtAngle(point, angle, distance) {
    var changeX = Math.cos(angle) * distance;
    var changeY = Math.sin(angle) * distance;

    return {
        x: point.x + changeX,
        y: point.y + changeY
    };
}


class Polygon {
    constructor(points) {
        this.points = points;
    }

    
    render() {
        noFill();
        strokeWeight(1);

        beginShape();
        for (var i of this.points)
            vertex(i.x, i.y);

        vertex(this.points[0].x, this.points[0].y);
        endShape();
    }


    pointInLine(point, index) {
        var point1 = this.points[index];
        var point2 = this.points[(index + 1) % this.points.length];
        var point3 = this.points[(index + 2) % this.points.length];

        var slope = (point2.y - point1.y) / (point2.x - point1.x);
        var y = x => slope * (x - point1.x) + point1.y;

        return (y(point3.x) - point3.y) * (y(point.x) - point.y);
    }


    pointInPolygon(point) {
        var state = 1;
        for (var i = 0; i < this.points.length; i ++) {
            var currentState = this.pointInLine(point, i);
            if (currentState === 0)
                state = 0;
            if (currentState < 0)
                return -1;
        }

        return state;
    }


    polygonInPolygon(polygon) {
        var state = -1;

        for (var i of this.points) {
            var currentState = polygon.pointInPolygon(i);
            if (currentState > state)
                state = currentState;
        }

        for (var i of polygon.points) {
            var currentState = this.pointInPolygon(i);
            if (currentState > state)
                state = currentState;
        }

        return state;
    }
}
