/**
 * Convex hull algorithms
 * Quick Hull
 * Based on the description: http://en.wikipedia.org/wiki/QuickHull
 * @param S {Array} set of points
 * @return {Array} points on the convex hull
 */
function quickHull(S) {
    var P = [];

    // 1. Find the points with minimum and maximum x coordinates, those are bound to be part of the convex.
    var minx = find_min_x_point(S);
    var maxx = find_max_x_point(S);

    // 2. Use the line formed by the two points to divide the set in two subsets of points,
    var subsets = split_points(S, minx, maxx);
    var subsetAboveTheLine = subsets[0];
    var subsetBelowTheLine = subsets[1];

    //  which will be processed recursively.
    process(subsetAboveTheLine, minx, maxx, P);
    process(subsetBelowTheLine, maxx, minx, P);

    return P;
}

function process(points, minx, maxx, P) {
    if(points.length > 0) {

        P.push(minx);

        var temp = split_points(points, minx, maxx);
        var pointsOutside = temp[0];

        // 3. Determine the point, on one side of the line, with the maximum distance from the line.
        // The two points found before along with this one form a triangle.
        var maxdist = find_max_distant_point(pointsOutside, minx, maxx);

        // 5. Repeat the previous two steps on the two lines formed by the triangle (not the initial line).
        process(pointsOutside, minx, maxdist, P);
        process(pointsOutside, maxdist, maxx,  P);
    }
}

function split_points(points, p1, p2) {
    var above = [];
    var below = [];

    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        if (Orientation(point, p1, p2) > 0) {
            above.push(point);
        }
        else {
            below.push(point);
        }
    }

    return [above, below];
}

function find_max_distant_point(points, p1, p2) {
    var dist = 0;
    var p = points[0];
    for (var i = 0; i < points.length; i++) {
        var temp = getPointsDistance(p1, points[i]) + getPointsDistance(p2, points[i]);
        if (temp > dist) {
            p = points[i];
            dist = temp;
        }
    }
    return p;
}

function find_min_x_point(points) {
    var p = points[0];

    $(points).each(function (i, v) {
        if (v.x < p.x) {
            p = v;
        }
    });

    return p;
}

function find_max_x_point(points) {
    var p = points[0];

    $(points).each(function (i, v) {
        if (v.x > p.x) {
            p = v;
        }
    });

    return p;
}
