import React from 'react';
import {IMeal, IMealMutation} from "../../types";
import {Link} from "react-router-dom";
import editImg from "../../assets/edit-img.png";
import deleteImg from "../../assets/trash.svg";
import axiosApi from "../../axiosApi";

interface IProps {
    meal: IMeal;
    fetchMeals: () => void;
}
const MealItem: React.FC<IProps> = ({meal, fetchMeals}) => {
    const fetchDelete = async (id: string) => {

        try {
            await axiosApi.delete<IMealMutation>(`/meals/${id}.json`);
            await fetchMeals();
        } finally {
            alert('Meal deleted!');
        }
    };


    const onDeletePost = (id: string) => {
        if(window.confirm('Do you want to delete meal?')) {
            void fetchDelete(id);
        }
    };

    return (
        <div className="meal-item">
            <div className="meal-txt">
                <h4 className="meal-time">{meal.time}</h4>
                <p className="meal-description">{meal.description}</p>
            </div>
            <div className="meal-info">
                <div className="meal-kcal">
                    <div className=" text-center"><b>{meal.calories} kcal</b></div>
                    <div><i>Date: {meal.date}</i></div>
                </div>
                <div className="meal-btns">
                    <Link to={'/meals/' + meal.id + '/edit'}>
                        <img src={editImg} alt="edit-img" className="edit-img"/>
                    </Link>
                    <button type="button" className="delete-btn" onClick={() => onDeletePost(meal.id)}>
                        <img src={deleteImg} alt="delete-img" className="delete-img"/>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default MealItem;