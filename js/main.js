window.onload = function () {
    let form_proc = new SettingsFormProcessor()

    form_proc.setChangeHandler(() => {
        console.log("boats: " + form_proc.boatCount)
        console.log("teams: " + form_proc.teamCount)
        console.log("races: " + form_proc.raceCount)
        console.log("boat_names: [" + form_proc.boatNames + "]")
        console.log("team_names: [" + form_proc.teamNames + "]")
    })
    form_proc.run()
}