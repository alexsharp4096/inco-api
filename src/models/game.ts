export class Game {
    constructor(
        public readonly id:string,
        public readonly name:string
    ) {};
    
    static create(id,name) {
        return new Game(id,name)
    }
}