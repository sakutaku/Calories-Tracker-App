export interface IMeal {
    id: string;
    calories: number;
    description: string;
    time: string;
}

export interface IApiMeal {
    [id: string]: IMeal;
}

export interface IMealMutation {
    calories: number;
    description: string;
    time: string;
}