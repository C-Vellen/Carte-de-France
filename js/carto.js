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

    // correction des positions des numéros pour certains départements
    const numPositionX = (nd) => {
        if (numerodepartement == "29") { return x + 7 }
        else if (numerodepartement == "22") { return x - 5 }
        else if (numerodepartement == "2A") { return x + 2 }
        else if (numerodepartement == "30") { return x + 10 }
        else if (numerodepartement == "31") { return x + 10 }
        else if (numerodepartement == "42") { return x - 10 }
        else if (numerodepartement == "54") { return x - 5 }
        else if (numerodepartement == "57") { return x - 5 }
        else if (numerodepartement == "59") { return x + 15 }
        else if (numerodepartement == "66") { return x + 5 }
        else if (numerodepartement == "75") { return x + 100 }
        else if (numerodepartement == "92") { return x + 100 }
        else if (numerodepartement == "93") { return x + 110 }
        else if (numerodepartement == "94") { return x + 110 }
        else if (numerodepartement == "90") { return x + 2 }
        else if (numerodepartement == "95") { return x + 5 }
        else if (numerodepartement == "971") { return x - 5 }
        else if (numerodepartement == "972") { return x - 5 }
        else { return x }
    }
    const numPositionY = (nd) => {
        if (numerodepartement == "29") { return y - 5 }
        else if (numerodepartement == "02") { return y - 5 }
        else if (numerodepartement == "07") { return y + 15 }
        else if (numerodepartement == "11") { return y }
        else if (numerodepartement == "13") { return y }
        else if (numerodepartement == "15") { return y }
        else if (numerodepartement == "25") { return y }
        else if (numerodepartement == "31") { return y - 10 }
        else if (numerodepartement == "54") { return y + 20 }
        else if (numerodepartement == "56") { return y - 5 }
        else if (numerodepartement == "59") { return y + 25 }
        else if (numerodepartement == "61") { return y - 5 }
        else if (numerodepartement == "62") { return y + 10 }
        else if (numerodepartement == "64") { return y }
        else if (numerodepartement == "69") { return y + 10 }
        else if (numerodepartement == "75") { return y - 32 }
        else if (numerodepartement == "92") { return y - 10 }
        else if (numerodepartement == "93") { return y - 35 }
        else if (numerodepartement == "94") { return y - 20 }
        else if (numerodepartement == "90") { return y + 0 }
        else if (numerodepartement == "971") { return y + 20 }
        else if (numerodepartement == "972") { return y - 3 }
        else if (numerodepartement == "976") { return y - 8 }
        else { return y + 5 }
    }
    numero.setAttribute("x", numPositionX(numerodepartement))
    numero.setAttribute("y", numPositionY(numerodepartement))
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

