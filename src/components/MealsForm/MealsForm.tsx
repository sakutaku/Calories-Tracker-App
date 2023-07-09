import React, {useState} from 'react';
import {MEALS} from "../../constants";
import {IMealMutation} from "../../types";
import axiosApi from "../../axiosApi";

interface IProps {
    existingMeal?: IMealMutation;
    isEdit?: boolean;
}

const initialState = {
    calories: '',
    description: '',
    time: '',
};

const MealsForm: React.FC<IProps> = ({ existingMeal = initialState, isEdit}) => {
    const[newMeal, setMeal] = useState<IMealMutation>(existingMeal);

    const mealChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>{
        const name = e.target.name;
        const value = e.target.value;

        setMeal(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(newMeal.description !== '' && newMeal.calories !== '') {
            const data = {
                ...newMeal,
            };
            try{
                await axiosApi.post(`/meals.json`, data);
            } finally {
                alert('Контент изменен!');
            }

        } else {
            alert('Add meal description!');
        }
    };

    return (
        <form className="main-form" onSubmit={onFormSubmit}>
            <div className="form-group mb-3">
                <label htmlFor="time" className="mb-2">Meal time</label>
                <select
                    value={newMeal.time}
                    required
                    onChange={mealChange}
                    name="time"
                    id="time"
                    className="form-control">
                    <option value="" disabled defaultValue="">Choose meal time</option>
                    {MEALS.map((item, index) => (
                        <option value={item.id} key={index}>{item.title}</option>
                    ))}
                </select>
            </div>
            <div className="form-group mb-3">
                <label htmlFor="description" className="mb-2">Describe meal</label>
                <input
                    type="text"
                    name="description"
                    id="description"
                    className="form-control"
                    value={newMeal.description}
                    onChange={mealChange}
                />
            </div>
            <div className="form-group mb-3">
                <label htmlFor="calories" className="mb-2">Calories</label>
                <input
                    type="number"
                    name="calories"
                    id="calories"
                    className="form-control"
                    value={newMeal.calories}
                    onChange={mealChange}
                />
            </div>
            <button type="submit" className="btn btn-warning">Save</button>
        </form>
    );
};

export default MealsForm;