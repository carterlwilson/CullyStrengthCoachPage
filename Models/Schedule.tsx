import Exercise from '../Models/Exercise';

export class Schedule {
    blocks: Block[];

    constructor() {

    }
}

export class Block {
    interation: number;
    blocks: Block[];
    constructor() {

    }
}

export class Week {
    iteration: number
    constructor() {

    }
}

export class ExerciseInstance {
    exercise: Exercise;
    percentage: Float
    constructor() {

    }
}