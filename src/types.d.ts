export interface IMeal {
    id: string;
    calories: number;
    description: string;
    time: string;
    date: string;
}

export interface IApiMeal {
    [id: string]: IMeal;
}

export interface IMealMutation {
    calories: string;
    description: string;
    time: string;
    date: string;
}
