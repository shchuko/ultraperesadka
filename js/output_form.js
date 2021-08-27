class TableUpdater {
    update(teams_races_data) {
        this._teams_races_data = teams_races_data
        this._updateTable(this._buildTable())
    }

    _appendFirstRow(table_elem) {
        let row = document.createElement("tr")

        let th = document.createElement("th")
        th.className = "left_column"
        th.innerText = "Race"
        row.appendChild(th)

        for (let i = 1; i <= this._teams_races_data[0].racesTotal; ++i) {
            let th = document.createElement("th")
            th.innerText = String(i)
            row.appendChild(th)
        }

        table_elem.appendChild(row)
    }

    _appendTeamRacesRow(table_elem, team_races) {
        let row = document.createElement("tr")

        let td = document.createElement("td")
        td.className = "left_column"
        td.innerText = team_races.teamName
        row.appendChild(td)

        for (let i = 0; i < team_races.racesTotal; ++i) {
            let td = document.createElement("td")
            td.innerText = team_races.races[i]
            row.appendChild(td)
        }

        table_elem.appendChild(row)
    }

    _buildTable() {
        let table_elem = document.createElement("table")
        this._appendFirstRow(table_elem)
        for (let i = 0; i < this._teams_races_data.length; ++i) {
            this._appendTeamRacesRow(table_elem, this._teams_races_data[i])
        }
        return table_elem
    }

    _updateTable(table) {
        document.getElementById("results_table").innerHTML = ""
        document.getElementById("results_table").appendChild(table)
    }
}

class CsvBuilder {
    constructor() {
        this._csv_string = ""
    }

    update(teams_races_data) {
        this._teams_races_data = teams_races_data
        this._buildCsvStr()
    }

    triggerCsvDownload() {
        let blob = new Blob([this._csv_string], {type: 'text/plain'})
        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'peresadka.csv'
        link.click()
    }

    _appendFirstRow() {
        let str = "Race"
        for (let i = 1; i <= this._teams_races_data[0].racesTotal; ++i) {
            str = str.concat(",", String(i))
        }
        this._csv_string = str
    }

    _appendTeamRacesRow(team_races) {
        let str = team_races.teamName

        for (let i = 0; i < team_races.racesTotal; ++i) {
            str = str.concat(",", team_races.races[i])
        }
        this._csv_string = this._csv_string.concat("\n", str)
    }

    _buildCsvStr() {
        this._appendFirstRow()
        for (let i = 0; i < this._teams_races_data.length; ++i) {
            this._appendTeamRacesRow(this._teams_races_data[i])
        }
    }
}

class OutputForm {
    constructor() {
        this._table_updater = new TableUpdater()
        this._csv_builder = new CsvBuilder()
        this._addEventListeners()
    }

    update(teams_races_data) {
        this._table_updater.update(teams_races_data)
        this._csv_builder.update(teams_races_data)
    }

    _addEventListeners() {
        document.getElementById("download_button").addEventListener("click", () => {
            this._csv_builder.triggerCsvDownload()
        })
    }
}