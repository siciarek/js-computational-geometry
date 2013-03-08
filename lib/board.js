Board.prototype = {
    config: {
        strokeStyle: "#CCCCCC",
        fillStyle: "#000000",
        boardBackgroundStyle: "#FFFFFF"
    }
};
Board.prototype.canvas = null;
Board.prototype.constructor = Board;

function Board(id, width, height) {
    id = id || "board";
    width = width || 640;
    height = height || 480;

    this.canvas = document.getElementById(id);
    this.canvas.width = width;
    this.canvas.height = height;
    this.erease();
}

Board.prototype.erease = function () {
    with (this.canvas.getContext("2d")) {
        globalAlpha = 1;
        beginPath();
        rect(0, 0, canvas.width, canvas.height);
        fillStyle = this.config.boardBackgroundStyle;
        fill();
        strokeStyle = this.config.strokeStyle;
        stroke();
    }
};

Board.prototype.drawPoints = function (points, color) {
    color = color || this.config.fillStyle;

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        this.drawPoint(point, color);
    }
};

Board.prototype.drawPoint = function (point, color) {

    var radius = 2;
    color = color || this.config.fillStyle;

    with (this.canvas.getContext("2d")) {
        beginPath();
        arc(point.x, point.y, radius, 0, 2 * Math.PI, false);
        fillStyle = color;
        fill();
    }
}

Board.prototype.drawLine = function (p1, p2, color) {
    color = color || this.config.strokeStyle;

    with (this.canvas.getContext("2d")) {
        beginPath();
        moveTo(p1.x, p1.y);
        lineTo(p2.x, p2.y);
        strokeStyle = color;
        stroke();
        closePath();
    }
}

Board.prototype.drawCircle = function (circle, color) {
    color = color || this.config.strokeStyle;

    with (this.canvas.getContext("2d")) {
        beginPath();
        arc(circle.cx, circle.cy, circle.radius, 0, 2 * Math.PI, false);
        strokeStyle = color;
        stroke();
    }
}

Board.prototype.drawPolygonWithPoints = function (points, color, bgcolor) {
    color = color || this.config.strokeStyle;
    this.drawPolygon(points, color, bgcolor);
    this.drawPoints(points, color);
}

Board.prototype.drawPolygon = function (points, color, bgcolor) {
    color = color || this.config.strokeStyle;
    bgcolor = bgcolor || "transparent";

    with (this.canvas.getContext("2d")) {
        beginPath();

        for (var i = 0; i < points.length; i++) {
            var p = points[i];
            if (i == 0) {
                moveTo(p.x, p.y);
            }
            lineTo(p.x, p.y);
        }
        closePath();

        strokeStyle = color;
        stroke();
        fillStyle = bgcolor;
        fill();
    }
}