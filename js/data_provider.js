class TeamRaces {
    constructor(team_name, races_total) {
        this._name = team_name
        this._races = new Array(parseInt(races_total))
        this._races.fill('-')
    }

    get teamName() {
        return this._name
    }

    get races() {
        return this._races
    }

    get racesTotal() {
        return this._races.length
    }

    setRaceBoat(race_no, boat_name) {
        this._races[parseInt(race_no)] = boat_name
    }
}

class RacePlanGenerator {

}