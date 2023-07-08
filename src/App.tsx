import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "./axiosApi";
import {IApiMeal, IMeal} from "./types";
import {useLocation} from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import Home from "./containers/Home/Home";
import './App.css';
const App = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchData = useCallback(async () => {
    try{
      setLoading(true);
      const mealsResponse = await axiosApi.get<IApiMeal>('/meals.json');
      if(mealsResponse.data) {
        const allMeals = Object.keys(mealsResponse.data).map((key) => {
          const meal = mealsResponse.data[key];
          meal.id = key;

          return meal;
        });

        setMeals(allMeals);
      } else {
        console.log('No posts!');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if(location.pathname === '/') {
      void fetchData();
    }
  },[fetchData, location]);

  return (
    <div className="container-fluid px-4">
      <header>
        <Toolbar/>
      </header>
      <Home meals={meals} loading={loading} fetchMeals={fetchData}/>
    </div>
  );
};

export default App;
