let labys;

$(document).ready(function () {
    $.getJSON("labyrinthes.json", function(json) {
        labys = json;
        for (const[key, value] of Object.entries(labys)) {
            let elem = `<option value="${key}">${key}</option>`
            $('#lab_id').append(elem);
        }
    });

});

function readLab() {
    console.log($(`#lab_id`).val())
    let laby = labys[$(`#lab_id`).val()];
    let ex = $(`#ex_id`).val();
}