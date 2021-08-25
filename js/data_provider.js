class TeamRaces {
    constructor(team_id, races_total) {
        this.id = team_id
        this.races = new Array(parseInt(races_total))
        this.races.fill('-')
    }

    get getId() {
        return this.id
    }

    get getRaces() {
        return this.races
    }

    addRaceBoatAssociation(race_no, boat) {
        this.races[parseInt(race_no)] = boat
    }
}

class RacePlanGenerator {

}