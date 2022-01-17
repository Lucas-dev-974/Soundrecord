function createSVG(){

    const container = document.getElementById('animated_background')
    const square    = document.createElement('span')
    square.setAttribute('class', 'svg_container')
    let size = Math.random() * 50

    square.style.width = 20 + size + 'px'
    square.style.height = 20 + size + 'px'

    square.style.top = Math.random() * innerHeight + 'px'
    square.style.left = Math.random() * innerWidth + 'px'

    
    // console.log('oko');

    let svg = document.createElement('img')
    svg.setAttribute('src', selectRandomSvg())
    svg.setAttribute('class', 'svg')
    svg.setAttribute('z-index', 99)
    square.appendChild(svg)

    container.appendChild(square)
    setTimeout(() => {
        square.remove()
    }, 5000) 
}


function selectRandomSvg(max = 5){
    let number  = Math.floor(Math.random() * max) + 1;
    let svg_url = './svg/' + number + '.svg'
    
    return svg_url
}


setInterval(createSVG, 150)
