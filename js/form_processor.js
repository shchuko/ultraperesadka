class SettingsFormProcessor {
    constructor() {
        this.boat_count = 1
        this.race_count = 1
        this.team_count = 1

        this.boat_names = []
        this.team_names = []

        this.boat_names_li_elems = []
        this.team_names_li_elems = []

        this.custom_boat_names_flag = false
        this.custom_team_names_flag = false
    }

    setChangeHandler(change_handler) {
        this.change_handler = change_handler
    }

    run() {
        this._addEventListeners()
        this._loadValues()
        this._globalChangeHandler()
    }

    get boatCount() {
        return this.boat_count
    }

    get raceCount() {
        return this.race_count
    }

    get teamCount() {
        return this.team_count
    }

    get boatNames() {
        return this.boat_names
    }

    get teamNames() {
        return this.team_names
    }

    _loadValues() {
        this._loadBoatCount()
        this._loadTeamCount()
        this._loadRaceCount()
    }

    _loadBoatCount() {
        let elem = document.getElementById("boat_count_input")
        this.boat_count = this._checkInputValid(elem, (val) => (val >= 1 && val < 50), 1)
        this._onBoatCountChange(this.boat_count)
    }

    _loadRaceCount() {
        let elem = document.getElementById("race_count_input")
        this.race_count = this._checkInputValid(elem, (val) => (val >= 1 && val < 50), 1)
        this._onTeamCountChange(this.team_count)
    }

    _loadTeamCount() {
        let elem = document.getElementById("team_count_input")
        this.team_count = this._checkInputValid(elem, (val) => (val >= 1 && val < 50), 1)
    }

    _checkInputValid(element, check_rule, val_if_invalid) {
        let val = element.value
        if (check_rule(val)) {
            element.style.backgroundColor = "gainsboro"
            return val
        } else {
            element.style.backgroundColor = "rgba(205, 92, 92, 0.39)"
            return val_if_invalid

        }
    }

    _globalChangeHandler() {
        this._loadValues()
        if (this.change_handler !== null && this.change_handler !== undefined) {
            this.change_handler()
        }
    }

    _createBoatNameLi(boat_no, boat_name) {
        let listItem = document.createElement("li");
        listItem.append(document.getElementById("custom_li_template").content.cloneNode(true));

        let boatNameInput = listItem.querySelectorAll((".li_text_input"))[0]
        boatNameInput.value = boat_name;
        boatNameInput.addEventListener("input", () => {
            this.boat_names[boat_no] = this._checkInputValid(
                boatNameInput,
                (val) => (val.trim() !== ""),
                boat_name).trim()
            this._globalChangeHandler()
        })
        return listItem;
    }

    _onBoatCountChange(new_boat_count) {
        if (!this.custom_boat_names_flag) {
            this.boat_names = Array.from({length: new_boat_count}, (_, i) => i + 1)
            return
        }

        if (this.boat_names_li_elems.length === new_boat_count) {
            return
        }

        let custom_boat_names_ul = document.getElementById("custom_boat_names_ul")
        if (this.boat_names_li_elems.length > new_boat_count) {
            let to_remove = this.boat_names_li_elems.slice(new_boat_count)
            this.boat_names_li_elems = this.boat_names_li_elems
                .reverse()
                .slice(this.boat_names_li_elems.length - new_boat_count)
                .reverse()

            this.boat_names = this.boat_names
                .reverse()
                .slice(this.boat_names.length - new_boat_count)
                .reverse()

            to_remove.forEach((elem => {
                custom_boat_names_ul.removeChild(elem)
            }))
            return
        }


        let to_add_len = new_boat_count - this.boat_names_li_elems.length
        let start_index = this.boat_names_li_elems.length
        for (let i = 0; i < to_add_len; ++i) {
            let boat_name = String(i + start_index + 1)
            let li = this._createBoatNameLi(i + start_index, boat_name)

            custom_boat_names_ul.appendChild(li)
            this.boat_names_li_elems.push(li)
            this.boat_names.push(boat_name)
        }
    }

    _customBoatNamesCheckboxListener() {
        const checked = document.getElementById("custom_boat_names_checkbox").checked
        if (checked !== this.custom_boat_names_flag) {
            this.custom_boat_names_flag = checked
            if (this.custom_boat_names_flag) {
                this.boat_names = []
            } else {
                document.getElementById("custom_boat_names_ul").innerHTML = ""
                this.boat_names_li_elems = []
            }
        }

        this._globalChangeHandler()
    }

    _createTeamNameLi(team_no, team_name) {
        let listItem = document.createElement("li");
        listItem.append(document.getElementById("custom_li_template").content.cloneNode(true));

        let teamNameInput = listItem.querySelectorAll((".li_text_input"))[0]
        teamNameInput.value = team_name;
        teamNameInput.addEventListener("input", () => {
            this.teamNames[team_no] = this._checkInputValid(teamNameInput,
                (val) => (val.trim() !== ""),
                team_name).trim()
            this._globalChangeHandler()
        })
        return listItem;
    }

    _onTeamCountChange(new_team_count) {
        if (!this.custom_team_names_flag) {
            this.team_names = Array.from({length: new_team_count}, (_, i) => "Team" + (i + 1))
            return
        }

        if (this.team_names_li_elems.length === new_team_count) {
            return
        }

        let custom_team_names_ul = document.getElementById("custom_team_names_ul")
        if (this.team_names_li_elems.length > new_team_count) {
            let to_remove = this.team_names_li_elems.slice(new_team_count)
            this.team_names_li_elems = this.team_names_li_elems
                .reverse()
                .slice(this.team_names_li_elems.length - new_team_count)
                .reverse()

            this.team_names = this.team_names
                .reverse()
                .slice(this.team_names.length - new_team_count)
                .reverse()

            to_remove.forEach((elem => {
                custom_team_names_ul.removeChild(elem)
            }))
            return
        }


        let to_add_len = new_team_count - this.team_names_li_elems.length
        let start_index = this.team_names_li_elems.length
        for (let i = 0; i < to_add_len; ++i) {
            let team_name = "Team" + (i + start_index + 1)
            let li = this._createTeamNameLi(i + start_index, team_name)

            custom_team_names_ul.appendChild(li)
            this.team_names_li_elems.push(li)
            this.team_names.push(team_name)
        }
    }

    _customTeamNamesCheckboxListener() {
        const checked = document.getElementById("custom_team_names_checkbox").checked
        if (checked !== this.custom_team_names_flag) {
            this.custom_team_names_flag = checked
            if (this.custom_team_names_flag) {
                this.team_names = []
            } else {
                document.getElementById("custom_team_names_ul").innerHTML = ""
                this.team_names_li_elems = []
            }
        }

        this._globalChangeHandler()
    }

    _addEventListeners() {
        document.getElementById("boat_count_input").addEventListener("input", () => (this._globalChangeHandler()))
        document.getElementById("race_count_input").addEventListener("input", () => (this._globalChangeHandler()))
        document.getElementById("team_count_input").addEventListener("input", () => (this._globalChangeHandler()))
        document.getElementById("custom_boat_names_checkbox").addEventListener("change", () => (this._customBoatNamesCheckboxListener()))
        document.getElementById("custom_team_names_checkbox").addEventListener("change", () => (this._customTeamNamesCheckboxListener()))
    }

}
