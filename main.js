const getRandomHslColor  = () => {
    // random number between 0 and 
    hue = Math.floor((Math.random() * 360));
    sat = 100
    light = 50
    return `hsl(${hue}, ${sat}%, ${light}%)`
}

/**
 * Sets a gradient in the html body
 * @param {string} startColor 
 * @param {string} stopColor 
 * @param {string} id 
 */
const createGradient = (startColor, stopColor, id) => {
    
    // create startColor
    stop0 = document.createElement('stop')
    stop0.offset = 0
    stop0.stopColor = startColor
    
    // create stopColor
    stop1 = document.createElement('stop')
    stop1.offset = 1
    stop1.stopColor = stopColor
    
    linearGradient = document.createElement('linearGradient')
    linearGradient.id = id
    linearGradient.appendChild(stop0)
    linearGradient.appendChild(stop1)

    console.log(stop0, stop1);
    

    document.getElementById('gradientDefs').appendChild(linearGradient)
}

/**
 * 
 * @param {array} points comma coordinates seperated by space: [[1,1],[2,2],[3,3]]
 * @param {string} fill url(#gradientID)
 * @param {string} stroke TODO
 * @param {number} strokeWidth pixels
 */
const getPolygon = (points, fillGradId, stroke, strokeWidth) => {
    svg = document.getElementById('drawBox')
    // NS = svg.getAttribute('xmlns');
    polygon = document.createElement('polygon');

    /**
     * CREATE AN SVG POINTLIST SOMEHOW
     */

    // for (var i = 0; i < points.length; i++) {
    //     svgPoint = svg.createSVGPoint()
    //     svgPoint.x = points[i][0]
    //     svgPoint.y = points[i][1]
    //     console.log(svgPoint);
    //     polygon.points.push(svgPoint)
    //     // svgpointlist.appendItem(svgPoint)
    // }

    console.log(stroke);
    

    polygon.points = points
    // polygon.setAttribute('points', points)
    polygon.style.fill = 'green'
    // polygon.style.fill = `url(#${fillGradId})`
    polygon.style.stroke = stroke
    polygon.style.strokeWidth = strokeWidth

    return polygon
}

const setup = () => {
    // create a gradient
    createGradient(getRandomHslColor(), getRandomHslColor(), 'testTriangle')

    // draw polygon
    pol = getPolygon('200,0 100,200 300,200', 'testTriangle', 'black', 4)
    // pol = getPolygon([[200,0], [100,200], [300,200]], 'testTriangle', 'black', 4)
    console.log(pol);
    
    document.getElementById('drawBox').appendChild(pol)
}

const tick = () => {
    // update all wanted variables
    // like position, color, etc.

    drawBoxSize = document.getElementById('drawBox').getBoundingClientRect()
    triangles = document.getElementsByClassName('triangle')
    
    for (let i = 0; i < triangles.length; i++) {
        const triangle = triangles[i];

        // split numbers from direction dataset in html
        xdirSet = triangle.dataset.xdir.split(" ").map(Math.round) // [1, 1, 1]
        console.log(xdirSet);
        

        // loop through triangles and give them a new position?
        for (let j = 0; j < triangle.points.length; j++) {
            const point = triangle.points[j];
            const xdir = xdirSet[j]

            // if direction is positive and beyond width OR
            // if direction is negative and below 0
            // reverse direction
            if (
                (xdir === 1 && point.x > drawBoxSize.width) ||
                (xdir === -1 && point.x < 0)
            ) {
                xdirSet[j] = (xdir * -1)
                triangle.dataset.xdir = xdirSet.join(" ")
            }

            point.x += xdir
        }
        
    }

    // can use transform:translate with non-scaling-stroke
}

const main = () => {
    // setup()

    // tick()
    tickInterval = setInterval(tick, 10);
}

window.onload = main