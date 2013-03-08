var vertices = [];

function AddAt(x, y) {
    vertices.push(new Vertex(x, y));
}

$(document).ready(function () {
    var board = new Board();

    $("#board").click(function (e) {
        e = e ? e : window.event;
        AddAt(e.clientX - this.offsetLeft, e.clientY - this.offsetTop);

        var triangles = Triangulate(vertices);

        board.erease();

        if (vertices.length < 3) {
            for (v in vertices) {
                var ver = vertices[v];
                board.drawPoint({x: ver.x, y: ver.y});
            }

            if (vertices.length > 1) {
                board.drawLine({x: vertices[0].x, y: vertices[0].y}, {x: vertices[1].x, y: vertices[1].y});
            }
        }

        for (i in triangles) {
            var triangle = triangles[i];
            board.drawPolygonWithPoints([triangle.v0, triangle.v1, triangle.v2], "lightblue");
            board.drawCircle({cx: triangle.center.x, cy: triangle.center.y, radius: triangle.radius}, "rgba(128,0,0,0.1)");
        }

        var algorithm;
        algorithm = quickHull;
        algorithm = giftWrapping;
        algorithm = grahamScan;

        var output = algorithm(vertices);

        board.drawPolygonWithPoints(output, "green");

    });
});
