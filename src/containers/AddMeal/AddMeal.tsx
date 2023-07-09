import React from 'react';
import MealsForm from "../../components/MealsForm/MealsForm";

const AddMeal = () => {
    return (
        <div className="addmeal-page">
            <h2 className="addmeal-page-title text-center">Add new meal to calories tracker!</h2>
            <MealsForm/>
        </div>
    );
};

export default AddMeal;