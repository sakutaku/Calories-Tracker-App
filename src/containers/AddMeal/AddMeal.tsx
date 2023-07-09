import React, {useState} from 'react';
import MealsForm from "../../components/MealsForm/MealsForm";
import {IMealMutation} from "../../types";
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";

const AddMeal = () => {
    const navigate = useNavigate();
    const [creating, setCreating] = useState(false);
    const onCreate = async (meal: IMealMutation) => {
        try{
            setCreating(true);
            await axiosApi.post('/meals.json', meal);
            navigate('/');
        } finally {
            setCreating(false);
        }

    };

    return (
        <div className="addmeal-page">
            <h2 className="addmeal-page-title text-center">Add new meal to calories tracker!</h2>
            <MealsForm onSubmit={onCreate} isEdit={false} isUpdating={creating}/>
        </div>
    );
};

export default AddMeal;