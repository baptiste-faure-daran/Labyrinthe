let labys;
let classes = ['top', 'right', 'bot', 'left'];

$(document).ready(function () {
    $.getJSON("labyrinthes.json", function (json) {
        labys = json;
        for (const [key, value] of Object.entries(labys)) {
            let elem = `<option value="${key}">${key}</option>`
            $('#lab_id').append(elem);
            console.log(labys)
        }
    });
});

function readLab() {
    $('.laby_grid').empty();
    let laby_id = $('#lab_id').val();
    let ex_id = $('#ex_id').val();
    let laby = labys[laby_id]["ex-" + (ex_id - 1)];

    let cell_laby = "<div></div>";
    $(".laby_grid").css('grid-template-columns', `repeat(${laby_id}, 1fr`);
    laby.forEach(cell => {
        let actual_cell = $(cell_laby).appendTo('.laby_grid');
        let walls = cell["walls"];
        for (let i = 0; i < walls.length; i++) {
            if (walls[i]) {
                actual_cell.addClass(classes[i])
            }
        }
    });
}
