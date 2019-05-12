/* eslint-disable no-restricted-syntax */
/**
 *  ShapeInfo.js
 *  @copyright 2002, 2017 Kevin Lindsey
 */

import {Point2D} from "kld-affine";

/**
 *  ShapeInfo
 *  @memberof module:kld-intersections
 */
export default class ShapeInfo {
    /**
     *  @param {string} name
     *  @param {Array} args
     *  @returns {module:kld-intersections.ShapeInfo}
     */
    constructor(name, args) {
        if (name in NAMES === false) {
            throw new TypeError(`Unrecognized shape type: '${name}'`);
        }
        if (ARG_COUNTS[name] !== -1 && ARG_COUNTS[name] !== args.length) {
            throw new RangeError(`expected ${ARG_COUNTS[name]} arguments, found ${args.length}`);
        }

        this.name = name;
        this.args = args;
    }

    /**
     *  Create a shape info instance from an object-based description
     *  @param {Object} obj
     *  @returns {ShapeInfo}
     */
    static fromObject(obj) {
        if ("type" in obj === false) {
            throw new TypeError("Missing required 'type' property in object");
        }

        if (typeof obj.type !== "string") {
            throw new TypeError("Expected string value for 'type' property");
        }

        // normalize type name
        const typeName = obj.type.length > 0
            ? obj.type[0].toUpperCase() + obj.type.slice(1).toLowerCase()
            : null;

        if (typeName === null || typeName in NAMES === false) {
            throw new TypeError(`Unrecognized shape type: '${obj.type}'`);
        }

        const constantName = NAMES[typeName];
        const propertyInfos = SHAPE_MAP[constantName].properties;
        const missingProperties = propertyInfos.filter(property => property.name in obj === false);

        if (missingProperties.length > 0) {
            const names = missingProperties.map(property => property.name).join(", ");

            throw new TypeError(`Missing required properties for ${typeName}: ${names}`);
        }

        const invalidProperties = propertyInfos.filter(info => {
            const {name, type} = info;
            const value = obj[name];

            switch (type) {
                case "Array":
                    /* eslint-disable-next-line compat/compat */
                    if (Array.isArray(value) === false) {
                        return true;
                    }

                    for (const element of value) {
                        switch (info.elementType) {
                            case "Point2D":
                                if (element instanceof Point2D === false) {
                                    return true;
                                }
                                break;
                            case "ShapeInfo":
                                if (element instanceof ShapeInfo === false) {
                                    return true;
                                }
                                break;
                            default:
                                return true;
                        }
                    }

                    return false;
                case "Number":
                    return isNaN(value) === false;
                case "Point2D":
                    return value instanceof Point2D === false;
                case null:
                default:
                    return false;
            }
        });

        if (invalidProperties.length > 0) {
            const names = invalidProperties.map(property => {
                const propertyType = property.type === "Array"
                    ? `Array<${property.elementType}>`
                    : property.type;

                return `  '${property.name}' should be ${propertyType}`;
            }).join("\n");

            if (invalidProperties.length === 1) {
                throw new TypeError(`The following property has an invalid type:\n${names}`);
            }
            else {
                throw new TypeError(`The following properties have invalid types:\n${names}`);
            }
        }

        // end validation

        const args = propertyInfos.map(info => obj[info.name]);

        return new ShapeInfo(typeName, args);
    }
}

// Build map of shape name to internal name
const SHAPE_MAP = {
    ARC: {
        name: "Arc",
        properties: [
            {name: "center", type: "Point2D"},
            {name: "radiusX", type: "Number"},
            {name: "radiusY", type: "Number"},
            {name: "startRadians", type: "Number"},
            {name: "endRadians", type: "Number"}
        ],
        argCount: 5
    },
    QUADRATIC_BEZIER: {
        name: "Bezier2",
        properties: [
            {name: "p1", type: "Point2D"},
            {name: "p2", type: "Point2D"},
            {name: "p3", type: "Point2D"}
        ],
        argCount: 3
    },
    CUBIC_BEZIER: {
        name: "Bezier3",
        properties: [
            {name: "p1", type: "Point2D"},
            {name: "p2", type: "Point2D"},
            {name: "p3", type: "Point2D"},
            {name: "p4", type: "Point2D"}
        ],
        argCount: 4
    },
    CIRCLE: {
        name: "Circle",
        properties: [
            {name: "center", type: "Point2D"},
            {name: "radius", type: "Number"}
        ],
        argCount: 2
    },
    ELLIPSE: {
        name: "Ellipse",
        properties: [
            {name: "center", type: "Point2D"},
            {name: "radiusX", type: "Number"},
            {name: "radiusY", type: "Number"}
        ],
        argCount: 3
    },
    LINE: {
        name: "Line",
        properties: [
            {name: "p1", type: "Point2D"},
            {name: "p2", type: "Point2D"}
        ],
        argCount: 2
    },
    PATH: {
        name: "Path",
        properties: [
            {name: "segments", type: "Array", elementType: "ShapeInfo"}
        ],
        argCount: -1
    },
    POLYGON: {
        name: "Polygon",
        properties: [
            {name: "points", type: "Array", elementType: "Point2D"}
        ],
        argCount: -1
    },
    POLYLINE: {
        name: "Polyline",
        properties: [
            {name: "points", type: "Array", elementType: "Point2D"}
        ],
        argCount: -1
    },
    RECTANGLE: {
        name: "Rectangle",
        properties: [
            {name: "topLeft", type: "Point2D"},
            {name: "bottomRight", type: "Point2D"}
        ],
        argCount: 2
    }
};
const ARG_COUNTS = {};
const NAMES = {};

/* eslint-disable-next-line guard-for-in */
for (const constantName in SHAPE_MAP) {
    const {name: shapeName, argCount} = SHAPE_MAP[constantName];

    // attach shape names as constants
    ShapeInfo[constantName] = shapeName;

    // make argument count table for args sanity check in constructor
    ARG_COUNTS[shapeName] = argCount;

    // make name list for runtime validation of names passed into constructor
    NAMES[shapeName] = constantName;
}
