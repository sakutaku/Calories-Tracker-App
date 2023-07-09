import React from 'react';
import MealsForm from "../../components/MealsForm/MealsForm";
import {IMealMutation} from "../../types";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";

const AddMeal = () => {
    const navigate = useNavigate();
    const onCreate = async (meal: IMealMutation) => {
        await axiosApi.post('/meals.json', meal);
        navigate('/');
    };

    return (
        <div className="addmeal-page">
            <h2 className="addmeal-page-title text-center">Add new meal to calories tracker!</h2>
            <MealsForm onSubmit={onCreate} isEdit={false}/>
        </div>
    );
};

export default AddMeal;