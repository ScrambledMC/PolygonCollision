try {
    class Polygon {
        constructor(points) {
            this.points = points;
        }

        
        render() {
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


    var pentagon = new Polygon([
        {x: 1200, y: 100},
        {x: 1700, y: 100},
        {x: 1900, y: 600},
        {x: 1450, y: 1000},
        {x: 1000, y: 600}
    ]);

    var tr1angle = new Polygon([
        {x: 1200, y: 700},
        {x: 1400, y: 1100},
        {x: 850, y: 850}
    ]);


    alert(pentagon.polygonInPolygon(tr1angle));
    // 1 if colliding, 0 if on line, -1 if not colliding

    
    function setup() {
        createCanvas(2000, 1200);
    }

    function draw() {
        noFill();
        pentagon.render();
        tr1angle.render();
    }

} catch (e) {
    alert(e);
}
