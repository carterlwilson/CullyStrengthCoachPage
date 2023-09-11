export default interface Excercise {
    Id?: string;
    Name: string;
    Type: number;
}

export enum ExerciseType {
    Main,
    Accessory
}