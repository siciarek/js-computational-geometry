/**
 * Convex hull algorithms
 * Graham scan
 * Based on the pseudocode from: http://en.wikipedia.org/wiki/Graham_scan#Pseudocode
 * And C++ implementation from: http://stackoverflow.com/questions/11107687/implementing-graham-scan-to-find-the-convex-hull
 * @param S {Array} set of points
 * @return {Array} points on the convex hull
 */
function grahamScan(S) {

    // let N           = number of points
    var N = S.length;

    // let points[N+1] = the array of points
    var points = new Array(N + 1);

    // swap points[1] with the point with the lowest y-coordinate
    var temp = S[0];
    for (var i = 1; i < N; ++i) {
        if (S[i].y < temp.y) {
            points[i + 1] = temp;
            temp = S[i];
        }
        else {
            points[i + 1] = S[i];
        }
    }
    points[1] = temp;

    // sort points by polar angle with points[1]
    for (var i = 2; i <= N; ++i) {
        temp = points[i];
        var angle = cosine(points[1], temp);

        var itmp = i;

        for (var j = 1; j <= N - i; ++j) {
            if (cosine(points[1], points[i + j]) > angle) {
                temp = points[i + j];
                angle = cosine(points[1], points[i + j]);
                itmp = i + j;
            }
        }

        points[itmp] = points[i];
        points[i] = temp;
    }

    //  We want points[0] to be a sentinel point that will stop the loop.
    points[0] = points[N];

    // M will denote the number of points on the convex hull.
    var M = 1;

    for (var i = 2; i <= N; ++i) {
        // Find next valid point on convex hull.
        while (ccw(points[M - 1], points[M], points[i]) <= 0) {
            if (M > 1) {
                M -= 1;
            }
            // All points are collinear
            else if (i == N) {
                break;
            }
            else {
                i += 1;
            }
        }

        // Update M and swap points[i] to the correct place.
        M += 1;
        temp = points[M];
        points[M] = points[i];
        points[i] = points[M];
    }

    return points.slice(0, M);
}

/**
 * Three points are a counter-clockwise turn if ccw > 0, clockwise if
 * ccw < 0, and collinear if ccw = 0 because ccw is a determinant that
 * gives the signed area of the triangle formed by p1, p2 and p3.
 */
function ccw(p1, p2, p3) {
    return (p2.x - p1.x) * (p3.y - p1.y) - (p2.y - p1.y) * (p3.x - p1.x);
}

/**
 * Dot product of vector
 * @param p1 First point of the vector
 * @param p2 Second point of the vector
 * @return {Number}
 */
function cosine(p1, p2) {
    return (p2.x - p1.x) / Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}
