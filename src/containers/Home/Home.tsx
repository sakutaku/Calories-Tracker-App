import React from 'react';
import {IMeal} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import Meals from "../../components/Meals/Meals";
import mainImg from "../../assets/main.png";
import {Link} from "react-router-dom";

interface IProps {
    meals: IMeal[];
    loading: boolean;
    fetchMeals: () => void;
}
const Home: React.FC<IProps> = ({meals, loading, fetchMeals}) => {
    const date = new Date();
    const curr_date = date.getDate();
    const curr_m = date.getMonth() + 1;
    const curr_y = date.getFullYear();
    let dateMain: string = '';

    if(curr_m < 10) {
        dateMain = curr_y+"-"+"0"+curr_m+"-"+ curr_date;
    } else {
        dateMain = curr_y+"-"+curr_m+"-"+ curr_date;
    }

    const todayMeal = meals.filter((meal) => {
        return dateMain === meal.date
    });

    const sum = todayMeal.reduce((acc, value)=> {
        return acc + Number(value.calories);
    }, 0);

    if(!loading) {
        return (
            <div className="row">
                <div className="col-4">
                    <div className="titles">
                        <h1 className=" meal-title">Fast</h1>
                        <h2 className=" meal-title-two">Calories tracker</h2>
                    </div>
                    <div>
                        <Meals meals={meals} fetchMeals={fetchMeals}/>
                    </div>
                </div>
                <div className="col-8">
                    <div className="main-img">
                        <img src={mainImg} alt="main-img"/>
                    </div>
                    <div className="main-img calories-info">
                        <span>Total calories for today: <b>{sum}</b> kcal!</span>
                        <Link to="/meals/new" className="btn btn-warning ms-3">Add new meal</Link>
                    </div>
                </div>
            </div>
        );
        } else {
            return(
                <Spinner/>
        )
    }
};

export default Home;