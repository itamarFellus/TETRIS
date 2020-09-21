export class Score {
    score;
    combo = 0;

    constructor(score) {
        this.score = score;
    }

    raiseScore(rows) {
        if(rows > 1) {
            this.raiseMultScore(rows);
        } else {
            this.score += 1 + 2 * this.combo;
        }
        this.combo++;
        return;
    }

    raiseMultScore(rows) {
        this.score = (this.score + Math.pow(2, rows));
        if(this.combo > 0) this.score *= this.combo;
    }

    getScore() {
        return this.score;
    }

    setCombo(number){
        this.combo = number;
    }

    getCombo() {
        return this.combo;
    }
}