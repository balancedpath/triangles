const getRandomHslColor  = (hueRangeStart, hueRangeEnd) => {
    // random number between 0 and 
    hue = Math.floor((Math.random() * (hueRangeEnd - hueRangeStart) + hueRangeStart));
    sat = 100
    light = 50
    return `hsl(${hue}, ${sat}%, ${light}%)`
}

const randomizeGrad = (gradId, hueRangeStart, hueRangeEnd) => {
    grad = document.getElementById(gradId)

    grad.children[0].style.stopColor = getRandomHslColor(hueRangeStart, hueRangeEnd)
    grad.children[1].style.stopColor = getRandomHslColor(hueRangeStart, hueRangeEnd)
}

const getPolygon = (points, fillGradId, stroke, strokeWidth) => {
    svg = document.getElementById('drawBox')
    // polygon = document.createElement('polygon');
    // polygon = document.createElementNS('http://www.w3.org/2000/svg','polygon');

    // finally some official docs
    // https://dev.w3.org/SVG/profiles/1.1F2/publish/coords.html#InterfaceSVGPointList

    // pointList = [];

    // for (var i = 0; i < points.length; i++) {
    //     svgPoint = svg.createSVGPoint()
    //     svgPoint.x = points[i][0]
    //     svgPoint.y = points[i][1]
    //     console.log(svgPoint);
    //     pointList.push(svgPoint)
    // }

    // console.log(stroke);
    

    polygon = new Polygon(0,0, 100,100, 300,300)




    // polygon.points = points
    // polygon.setAttribute('points', points)

    // document.getElementById('drawBox').appendChild(pol)
}

const setup = () => {
    // randomize the existing gradients
    randomizeGrad('grad1', 0, 110)
    randomizeGrad('grad2', 120, 230)
    randomizeGrad('grad3', 240, 350)

    document.getElementById('preMadeTriangle1').addEventListener('click', () => {
        randomizeGrad('grad1', 0, 110)
    })
    document.getElementById('preMadeTriangle2').addEventListener('click', () => {
        randomizeGrad('grad2', 120, 230)
    })
    document.getElementById('preMadeTriangle3').addEventListener('click', () => {
        randomizeGrad('grad3', 240, 350)
    })

    alert("Tap a triagle to change it's color!")
}

const tick = () => {

    drawBoxSize = document.getElementById('drawBox').getBoundingClientRect()
    triangles = document.getElementsByClassName('triangle')
    
    for (let i = 0; i < triangles.length; i++) {
        const triangle = triangles[i];

        // split numbers from direction dataset in html
        xdirSet = triangle.dataset.xdir.split(" ").map(Number) // [1, 1, 1]
        ydirSet = triangle.dataset.ydir.split(" ").map(Number) // [1, 1, 1]

        // loop through triangles and give them a new position?
        for (let j = 0; j < triangle.points.length; j++) {
            const point = triangle.points[j];
            
            const xdir = xdirSet[j]
            if (
                // if direction is positive and beyond width OR
                (xdir > 0 && point.x > drawBoxSize.width) ||
                // if direction is negative and below 0
                (xdir < 0 && point.x < 0)
            ) {
                // reverse direction
                xdirSet[j] = (xdir * -1)
                // write to DOM
                triangle.dataset.xdir = xdirSet.join(" ")
            }
            point.x += xdir

            const ydir = ydirSet[j]
            if (
                (ydir > 0 && point.y > drawBoxSize.height) ||
                (ydir < 0 && point.y < 0)
            ) {
                ydirSet[j] = (ydir * -1)
                triangle.dataset.ydir = ydirSet.join(" ")
            }
            point.y += ydir
        }
    }
}

const main = () => {
    setup()
    tickInterval = setInterval(tick, 30);
}

window.onload = main