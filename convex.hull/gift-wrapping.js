/**
 * Convex hull algorithms
 * Gift wrapping
 * Based on the pseudocode from: http://en.wikipedia.org/wiki/Gift_wrapping_algorithm#Pseudocode
 * @param S {Array} set of points
 * @return {Array} points on the convex hull
 */
function giftWrapping(S) {
    var P = [];

    var pointOnHull = leftmost_point_in(S);
    var i = 0;
    do {
        P[i] = pointOnHull;
        var endpoint = S[0];
        for (var j = 1; j < S.length; j++) {
            if ((endpoint == pointOnHull) || is_on_left_of_line(S[j], pointOnHull, endpoint)) {
                endpoint = S[j];
            }
        }
        i = i + 1;
        pointOnHull = endpoint;
    } while (!(endpoint == P[0]));

    return P;
}

function leftmost_point_in(points) {
    var p = points[0];

    $(points).each(function (i, v) {
        if (v.x < p.x) {
            p = v;
        }
    });

    return p;
}

function is_on_left_of_line(point, A, B) {
    var orientation = (B.x - A.x) * (point.y - A.y) - (point.x - A.x) * (B.y - A.y);

    if (orientation > 0) {
        return true;
    }

    return false;
}