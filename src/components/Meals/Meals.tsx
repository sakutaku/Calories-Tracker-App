import React from 'react';
import {IMeal} from "../../types";
import MealItem from "./MealItem";

interface IProps {
    meals: IMeal[];
    fetchMeals: () => void;
}
const Meals: React.FC<IProps> = ({meals, fetchMeals}) => {
    return (
        <div>
            {meals.map(meal => (
                <MealItem key={meal.id} meal={meal} fetchMeals={fetchMeals}/>
            ))}
        </div>
    );
};

export default Meals;