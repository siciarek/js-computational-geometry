var EPSILON = 1.0e-6;

var colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "lightyellow",
    "orange",
    "lightblue",
    "lightgreen",
    "magenta"
];

function getColor() {
    var colindex =  Math.floor(Math.random() * 10000) % colors.length;

    return colors[colindex];
}

Vertex.prototype = {};
Vertex.prototype.constructor = Vertex;
Vertex.prototype.x = 0;
Vertex.prototype.y = 0;
function Vertex(x, y) {
    this.x = x;
    this.y = y;
}

function getSetOfPoints(number, margin, width, height) {

    width = width || 640;
    height = height || 480;
    number = number || 32;
    margin = margin || 0.1;

    var points = [];
    var xmargin = width * margin;
    var ymargin = height * margin;
    var xo = xmargin;
    var yo = ymargin;
    var dx = width - xmargin * 2;
    var dy = height - ymargin * 2;

    for (var i = 0; i < number; i++) {
        var point = new Point(Math.round((xo + self.Math.random() * dx) * 10) / 10, Math.round((yo + self.Math.random() * dy) * 10) / 10);
        points.push(point);
    }

    return points;
}

function getPointsDistance(p1, p2) {
    var mx = p1.x;
    var my = p1.y;
    var cx = p2.x;
    var cy = p2.y;
    var distance = Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy));
    return distance;
}

function isInsideCircle(circle, point) {
    var radius = circle.radius;
    var distance = getPointsDistance({x: circle.cx, y: circle.cy}, point);
    return distance + 0.1 < radius;
}

function getTriangle(points) {
    var a = -1;
    var b = -1;
    var c = -1;

    while (!(a !== b && b !== c && c !== a && (typeof generated[a + "-" + b + "-" + c ] === "undefined"))) {
        a = Math.floor(Math.random() * 10000) % points.length;
        b = Math.floor(Math.random() * 10000) % points.length;
        c = Math.floor(Math.random() * 10000) % points.length;
    }

    generated[a + "-" + b + "-" + c ] = true;

    return [points[a], points[b], points[c]];
}

function getCircumcircle(triangle) {

    var circle = {
        cx: 0,
        cy: 0,
        radius: 0
    };

    var x = triangle[0];
    var y = triangle[1];
    var z = triangle[2];

    var a1 = x.x - y.x;
    var a2 = y.x - z.x;
    var b1 = x.y - y.y;
    var b2 = y.y - z.y;
    var c1 = -(a1 * ((x.x + y.x) / 2) + b1 * ((x.y + y.y) / 2));
    var c2 = -(a2 * ((y.x + z.x) / 2) + b2 * ((y.y + z.y) / 2));

    circle.cx = (-c1 * b2 + c2 * b1) / (a1 * b2 - a2 * b1);
    circle.cy = (-a1 * c2 + a2 * c1) / (a1 * b2 - a2 * b1);
    circle.radius = getPointsDistance(x, {x: circle.cx, y: circle.cy});

    return circle;
}

function getLeftMostPoint(points, maxx) {
    var minx = maxx;
    var leftMostPoint = null;

    $(points).each(function (i, v) {
        if (v.x < minx) {
            minx = v.x;
            leftMostPoint = v;
        }
    });

    return leftMostPoint;
}

function getOtherPoint(points, point) {
    var temp = [];
    for (i = 0; i < points.length; i++) {
        var p = points[i];
        if (p.x !== point.x && p.y !== point.y) {
            return p;
        }
    }
}

function Orientation(point, A, B) {

    // Determinant
    var orientation = (B.x - A.x) * (point.y - A.y) - (point.x - A.x) * (B.y - A.y);

    if (orientation > 0) { // (* Orientaion is to the left-hand side  *)
        return -1;
    }

    if (orientation < 0) { // (* Orientaion is to the right-hand side *)
        return 1;
    }

    return 0;              //  (* Orientaion is neutral aka collinear  *)
}

function pointsEquals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
