/**
 * Brute force algorithm:
 * add edge if two triangles in delanay trianglulation have mutual edge
 * @param triangles
 * @return {Array}
 */
function voronoi(triangles) {

    var edges = [];

    for (f in triangles) {
        var first = triangles[f];
        for (s in triangles) {
            var second = triangles[s];

            if(first === second) {
                continue;
            }

            var firstv = [first.v0, first.v1, first.v2];
            var secondv = [second.v0, second.v1, second.v2];

            var bothv = 0;

            for(fv in firstv) {
                var fver = firstv[fv];
                for(sv in secondv) {
                    var sver = secondv[sv];

                    if(sver == fver) {
                        bothv++;
                    }
                }
            }

            if(bothv == 2) {
                edges.push([first.circumcircle.center, second.circumcircle.center]);
            }
        }
    }

    return edges;
}
