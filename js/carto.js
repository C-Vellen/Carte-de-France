//  -------- paramètres d'affichage ----------------------
// dimensions du viewport svg :
const xMax = 675
const yMax = 780

const svg = document.querySelector("svg")
const svgNS = "http://www.w3.org/2000/svg"

// correction de la position du nom des départements en bordure de fenêtre :
const nomPositionX = (x, w) => {
    if (x - w / 2 < 10) { return w / 2 + 10 }
    else if (x + w / 2 > xMax - 10) { return xMax - w / 2 - 10 }
    else { return x }
}

// correction des positions des numéros pour certains départements
const correction_positions = {
    "02": { "dx": 0, "dy": -5 },
    "07": { "dx": 0, "dy": +15 },
    "08": { "dx": 0, "dy": +10 },
    "11": { "dx": 0, "dy": 0 },
    "13": { "dx": 0, "dy": 0 },
    "15": { "dx": 0, "dy": 0 },
    "22": { "dx": -5, "dy": 5 },
    "25": { "dx": 0, "dy": 0 },
    "29": { "dx": +7, "dy": -5 },
    "2A": { "dx": +2, "dy": 0 },
    "30": { "dx": +10, "dy": 0 },
    "31": { "dx": +10, "dy": -10 },
    "41": { "dx": 0, "dy": 10 },
    "42": { "dx": -10, "dy": 0 },
    "54": { "dx": -5, "dy": +20 },
    "56": { "dx": 0, "dy": -5 },
    "57": { "dx": -5, "dy": 2 },
    "59": { "dx": +15, "dy": +25 },
    "61": { "dx": 0, "dy": -5 },
    "62": { "dx": 0, "dy": +10 },
    "64": { "dx": 0, "dy": 0 },
    "66": { "dx": +5, "dy": 5 },
    "69": { "dx": 0, "dy": +10 },
    "75": { "dx": +100, "dy": -32 },
    "80": { "dx": 0, "dy": 5 },
    "82": { "dx": -2, "dy": 4 },
    "90": { "dx": +2, "dy": 0 },
    "92": { "dx": +100, "dy": -10 },
    "93": { "dx": +110, "dy": -35 },
    "94": { "dx": +110, "dy": -20 },
    "95": { "dx": +5, "dy": 5 },
    "971": { "dx": -5, "dy": +20 },
    "972": { "dx": -5, "dy": -3 },
    "976": { "dx": 0, "dy": -8 },
}
const correctPosition = (numerodepartement) => {
    if (Object.keys(correction_positions).includes(numerodepartement)) {
        console.log("yes")
        return correction_positions[numerodepartement]
    } else {
        console.log("no")
        return { "dx": 0, "dy": 0 }
    }
}

// conversion coordonnées pointeur / coordonnées svg
const cursorPoint = (e) => {
    const pt = svg.createSVGPoint()
    pt.x = e.clientX; pt.y = e.clientY
    return pt.matrixTransform(svg.getScreenCTM().inverse())
}

// affichage du numéro des départements :
for (elt of svg.querySelectorAll(".departement")) {
    const node = elt.getBBox()
    const numerodepartement = elt.dataset.numerodepartement
    const x = Math.floor(node.x + node.width / 2)
    const y = Math.floor(node.y + node.height / 2)

    const numero = document.createElementNS(svgNS, "text")
    svg.querySelector("#numero_departements").append(numero)
    numero.textContent = numerodepartement

    numero.setAttribute("x", x + correctPosition(numerodepartement)["dx"])
    numero.setAttribute("y", y + correctPosition(numerodepartement)["dy"])
    numero.setAttribute("text-anchor", "middle")
    numero.setAttribute("alignment-baseline", "middle")
}


// interactivité avec la carte de France
const nom_departement = svg.querySelector("#nom_departement")
const text_dpt = nom_departement.querySelector("text")
const rect_dpt = nom_departement.querySelector("rect")
for (dpt of svg.querySelectorAll(".departement")) {

    // illumination et affichage du nom du département au survol
    dpt.addEventListener("pointermove", (e) => {
        const x = cursorPoint(e).x
        const y = cursorPoint(e).y
        const nomdept = e.target.dataset.nom
        const numero = e.target.dataset.numerodepartement
        text_dpt.textContent = nomdept
        text_dpt.setAttribute("text-anchor", "middle")
        const recttext = text_dpt.getBBox()
        const textWidth = recttext.width
        rect_dpt.setAttribute("x", -textWidth / 2 - 5)
        rect_dpt.setAttribute("width", textWidth + 10)
        rect_dpt.setAttribute("opacity", "0.8")
        nom_departement.setAttribute("transform", `translate(${nomPositionX(x, textWidth)}, ${y - 20})`)
        e.target.style.fill = "#aaf"
    })
    // masquage du nom du département quand le pointeur quitte ce département
    dpt.addEventListener("pointerleave", (e) => {
        e.target.style.fill = "#fff"
        e.target.style.cursor = "auto"
        text_dpt.textContent = null
        rect_dpt.setAttribute("opacity", "0")
    })

}

