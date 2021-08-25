function getBoatCount() {
    return document.getElementById("boat_count_input").value
}

function getRaceCount() {
    return document.getElementById("race_count_input").value
}

function getTeamCount() {
    return document.getElementById("team_count_input").value
}

function setGenerateButtonListener(onPressFunc) {
    document.getElementById("generate_button").addEventListener("click", onPressFunc)
}