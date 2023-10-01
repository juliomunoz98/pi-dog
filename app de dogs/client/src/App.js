import { Route, Switch, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

import { fullDogs } from "./redux/Actions/Actions";
import Nav from "./Componentes/Nav/Nav";
import Home from "./Componentes/Home/Home";
import Form from './Componentes/Form/Form';
import Detail from './Componentes/Detail/Detail';
import InitialPage from "./Componentes/InitialPage/InitialPage";
import DetailBD from './Componentes/Detail/DetailBD';


import './App.css';



function App() {
  const location = useLocation()
  const dispatch = useDispatch()

  const onSearch = async function (dogName) {

    try {
      const { data } = await axios.get(`http://localhost:3001/dogs?name=${dogName}`)
      if (!Array.isArray(data)) {
        window.alert("No se encontraron perros")
        return
      }
      const dataR = data.map(objeto => {
        const newObjet = { ...objeto }; // Copia superficial del objeto

        if (!newObjet.hasOwnProperty('temperament')) {
          newObjet.temperament = ["sin temperamentos asociados"];
        } else {
          newObjet.temperament = newObjet.temperament.split(", ");
        }

        return newObjet;
      });

      dispatch(fullDogs(dataR))


    } catch (error) {
      window.alert(error)

    }

  }

  return (
    <div className="App">
      {location.pathname !== "/" && <Nav onSearch={onSearch} />}
      <Switch>
        <Route exact path="/" component={InitialPage} />
        <Route exact path="/home" render={() => <Home onSearch={onSearch} />} />
        <Route exact path="/apidet/:id" component={Detail} />
        <Route path="/detailBd/:id" component={DetailBD} />
        <Route path="/form" component={Form} />
      </Switch>
    </div>
  );
}
// onSearch={onSearch}
export default App;
