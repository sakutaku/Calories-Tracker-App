import React, {useCallback} from 'react';
import {IMeal, IMealMutation} from "../../types";
import {Link, useNavigate} from "react-router-dom";
import editImg from "../../assets/edit-img.png";
import deleteImg from "../../assets/trash.svg";
import axiosApi from "../../axiosApi";

interface IProps {
    meal: IMeal;
    fetchMeals: () => void;
}
const MealItem: React.FC<IProps> = ({meal, fetchMeals}) => {
    const navigate = useNavigate();

    const fetchDelete = useCallback(async (id: string) => {
        try {
            await axiosApi.delete<IMealMutation>(`/meals/${id}.json`);
            fetchMeals();
            navigate('/');
        } finally {
            alert('Post deleted!');
        }
    }, []);


    const onDeletePost = (id: string) => {
        void fetchDelete(id);
    };

    return (
        <div className="meal-item">
            <div className="meal-txt">
                <h4 className="meal-time">{meal.time}</h4>
                <p className="meal-description">{meal.description}</p>
            </div>
            <div className="meal-info">
                <div className="meal-kcal">
                    {meal.calories} kcal
                </div>
                <div className="meal-btns">
                    <Link to={'/meals' + meal.id + '/edit'}>
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