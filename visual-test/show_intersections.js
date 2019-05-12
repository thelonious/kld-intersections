const {SvgShapes, Intersection} = KldIntersections;

/**
 * Intersect some shapes
 */
function go() {
    const shapes = getShapes();

    if (shapes !== null) {
        const [shape1, shape2] = shapes;
        const result = Intersection.intersect(shape1, shape2);

        const xml = result.points.map(point => {
            return `<use href="#intersection" x="${point.x}" y="${point.y}"/>`;
        }).join("\n");

        document.getElementById("result").innerHTML = xml;
    }
}

/**
 * Get the shapes to intersect
 *
 * @returns {null|module:kld-intersections.ShapeInfo[]}
 */
function getShapes() {
    const container = document.getElementById("shapes");
    const shapes = container.querySelectorAll("circle,ellipse,line,path,polygon,polyline,rect");

    if (shapes.length >= 2) {
        return [
            SvgShapes.element(shapes[0]),
            SvgShapes.element(shapes[1])
        ];
    }

    return null;
}
