window.onload = function () {
    let form_proc = new SettingsFormProcessor()
    let output_form = new OutputForm()

    form_proc.setChangeHandler(() => {
        let team_races = []
        for (let i = 0; i < form_proc.teamCount; ++i) {
            team_races.push(new TeamRaces(form_proc.team_names[i], form_proc.raceCount))
        }
        output_form.update(team_races)
    })
    form_proc.run()
}