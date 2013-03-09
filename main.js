var vertices = [];



function displayResult(board) {

    var convexHull;
    convexHull = quickHull;
    convexHull = giftWrapping;
    convexHull = grahamScan;
    var output = convexHull(vertices);

    var triangles = triangulate(vertices);
    var voredges = voronoi(triangulate(vertices, "no"));

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
//            board.drawCircle({cx: triangle.circumcircle.center.x, cy: triangle.circumcircle.center.y, radius: triangle.circumcircle.radius}, "rgba(128,0,0,0.1)");
    }

    for (c in voredges) {
        board.drawLine(voredges[c][0], voredges[c][1], "black");
    }

    board.drawPolygonWithPoints(output, "green");

    for (v in vertices) {
        var ver = vertices[v];
        board.drawPoint({x: ver.x, y: ver.y});
    }
}


$(document).ready(function () {
    var board = new Board();

    vertices = getSetOfVertices();

    displayResult(board);

    $("#board").click(function (e) {
        e = e ? e : window.event;

        var x = e.clientX - this.offsetLeft;
        var y = e.clientY - this.offsetTop;

        vertices.push(new Vertex(x, y));

        displayResult(board);
    });
});
