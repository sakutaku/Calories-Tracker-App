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

    if(!loading) {
        return (
            <div className="row">
                <div className="col-3">
                    <div className="titles">
                        <h1 className=" meal-title">Fast</h1>
                        <h2 className=" meal-title-two">Calories tracker</h2>
                    </div>
                    <div>
                        <Meals meals={meals} fetchMeals={fetchMeals}/>
                    </div>
                </div>
                <div className="col-9">
                    <div className="main-img">
                        <img src={mainImg} alt="main-img"/>
                    </div>
                    <div className="main-img calories-info">
                        <span>Total calories: </span>
                        <Link to="/meals/new">Add new meal</Link>
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