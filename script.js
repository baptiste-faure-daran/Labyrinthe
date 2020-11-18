let labys;
let classes = ['top', 'right', 'bot', 'left'];
let positionLab = [];
let size;

$(document).ready(function () {
    $.getJSON("labyrinthes.json", function (json) {
        labys = json;
        for (const [key, value] of Object.entries(labys)) {
            let elem = `<option value="${key}">${key}</option>`
            $('#lab_id').append(elem);
        }
    });
});

function readLab() {
    clearAllTimeouts();
    $('.laby_grid').empty();
    pos = [];
    let laby_id = $('#lab_id').val();
    size = laby_id;
    let ex_id = $('#ex_id').val();
    let laby = labys[laby_id]["ex-" + (ex_id - 1)];

    let cell_laby = "<div></div>";
    $(".laby_grid").css('grid-template-columns', `repeat(${laby_id}, 1fr)`);
    let posX = posY = 0;
    
    laby.forEach(cell => {
        let neighbour = [];
        // Garder en mémoire la position sur le labyrinthe 
        if (posY == laby_id) {
            posY = 0;
            posX++;
        }
        let actual_cell = $(cell_laby).appendTo('.laby_grid');
        actual_cell.attr('id', posX + '-' + posY);
        let walls = cell["walls"];
        for (let i = 0; i < walls.length; i++) {
            if (walls[i]) {
                actual_cell.addClass(classes[i])
            } else {
                neighbour.push(classes[i]);
            }
        }
        let posName = posX + '-' + posY;
        positionLab[posName] = { "posX": posX, "posY": posY, "neighbour": neighbour };
        posY++;
    });
}

function DFS() {
    clearAllTimeouts();
    let i = 0;
    let speed = 200;
    let visited = [];
    let stack = [];
    let pos = positionLab;
    stack.push(pos['0-0']);
    let current = stack.pop();
    while (current != pos[(size - 1) + '-' + (size - 1)]) {
        // vérifier que l'élément n'a pas encore été visité
        if (!visited.includes(current)) {
            visited.push(current);
            let delay = speed * i;
            // Change la couleur de la div associée à la case actuellement parcourue
            changeCellColor(current['posX'] + '-' + current['posY'], delay);
            current['neighbour'].forEach(direction => {
                let neighbour = getNeighbour(direction, visited, current);
                if (neighbour != null) {
                    stack.push(neighbour);
                }
            })
        }
        current = stack.pop();
        i++;
    }
    console.log("Trouvé : " + current['posX'] + '-' + current['posY']);
}

function changeCellColor(id, delay) {
    setTimeout(() => $('#' + id).addClass('visit'), delay)
}

function getNeighbour(direction, visited, curr) {
    let x = curr['posX'];
    let y = curr['posY'];
    let cell;
    switch(direction) {
        case "top":
            cell = positionLab[(x - 1) + '-' + y];
            break;
        case "bot":
            cell = positionLab[(x + 1) + '-' + y];
            break;
        case "right" :
            cell = positionLab[x + '-' + (y + 1)];
            break;
        case "left" :
            cell = positionLab[x + '-' + (y - 1)];
            break;
    }
    if (!visited.includes(cell)) {
        return cell;
    }
    return null;
}

function clearAllTimeouts() {
    var id = window.setTimeout(function() {}, 0);

    while (id--) {
        window.clearTimeout(id);
    }
}