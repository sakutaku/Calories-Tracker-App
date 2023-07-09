import React, {useCallback, useEffect, useState} from 'react';
import axiosApi from "./axiosApi";
import {IApiMeal, IMeal} from "./types";
import {Route, Routes, useLocation} from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import Home from "./containers/Home/Home";
import './App.css';
import AddMeal from "./containers/AddMeal/AddMeal";
import EditMeal from "./containers/EditMeal/EditMeal";
const App = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchData = useCallback(async () => {
    try{
      setLoading(true);
      const mealsResponse = await axiosApi.get<IApiMeal | null>('/meals.json');
      const mealsData = mealsResponse.data;

      if(!mealsData) {
        setMeals([]);
        return;
      }

      const allMeals = Object.keys(mealsData).map((key) => {
        const meal = mealsData[key];
        meal.id = key;

        return meal;
      });
      allMeals.sort((a,b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      setMeals(allMeals);

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
      <Routes>
        <Route path="/" element={(
            <Home meals={meals} loading={loading} fetchMeals={fetchData}/>
        )}/>
        <Route path="/meals/new" element={(
            <AddMeal/>
        )}/>
        <Route path={'/meals/:id/edit'} element={(
            <EditMeal/>
        )}/>
      </Routes>

    </div>
  );
};

export default App;
