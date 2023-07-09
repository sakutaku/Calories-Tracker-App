import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IMealMutation} from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";
import MealsForm from "../../components/MealsForm/MealsForm";

const EditMeal = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState<IMealMutation | null>(null);
    const [updating, setUpdating] = useState(false);


    const fetchData = useCallback(async (id: string) => {
        const mealResponse = await axiosApi.get<IMealMutation>(`/meals/${id}.json`);
        setMeal(mealResponse.data);
    }, []);

    useEffect(() => {
        if(id) {
            void fetchData(id);
        }

    }, [fetchData, id]);

    const updateDish = async (data: IMealMutation) => {
        try{
            setUpdating(true);
            await axiosApi.put(`/meals/${id}.json`, data);
        } finally {
            setUpdating(false);
            alert('Meal is edited!');
        }

    };

    return (

        <div className="editmeal-page">
            <h2 className="editmeal-page-title text-center">Edit meal</h2>
            { meal ?
                <MealsForm
                    onSubmit={updateDish}
                    existingMeal={meal}
                    isEdit={true}
                    isUpdating={updating}
                />
                :
                <Spinner/>
            }
        </div>
    );
};

export default EditMeal;