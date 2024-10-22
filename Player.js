class Player {
    constructor(xyz, rotation, polygon) {
        this.xyz = xyz;
        this.rotation = rotation;
        this.polygon = polygon;
    }


    getPolygon() {
        var points = [];

        for (var i of this.polygon.points) {
            var current = {
                x: i.x + this.xyz.x,
                y: i.y + this.xyz.y
            };

            current = rotatePoint(current, this.xyz, this.rotation);

            points.push(current);
        }

        return new Polygon(points);
    }


    render() {
        drawPoint(this.xyz);
        this.getPolygon().render();
    }
}
