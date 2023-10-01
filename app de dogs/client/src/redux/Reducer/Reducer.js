import { FULLDOGS, FILTERTEMP, ORDERALPH, ORDERBYKG, ORIGIN } from "../Actions/Types";

const iniialState = {
    allDogs: [], // Lista de todas las razas de perros
    setDogs: [], // Lista de perros filtrados
    filtered: [], // Lista de perros filtrados por temperamento
}

function rootReducer(state = iniialState, { type, payload }) {
    switch (type) {
        case FULLDOGS:
            return {
                allDogs: [...payload], // Actualiza la lista de todas las razas de perros con la carga útil recibida
                setDogs: [...payload], // Actualiza la lista de perros filtrados con la carga útil recibida
                filtered: [...payload], // Actualiza la lista de perros filtrados por temperamento con la carga útil recibida
            }
        case ORDERALPH:
            let orderCards;
            if (payload === "Ascendente") {
                // Ordena la lista de todas las razas de perros alfabéticamente ascendente
                orderCards = state.allDogs.sort((a, b) => a.name.localeCompare(b.name))
            } else {
                // Ordena la lista de todas las razas de perros alfabéticamente descendente
                orderCards = state.allDogs.sort((a, b) => b.name.localeCompare(a.name))
            }
            return {
                ...state,
                allDogs: [...orderCards], // Actualiza la lista de todas las razas de perros ordenada
            };

        case FILTERTEMP:
            let filter = state.filtered.filter((item) => item.temperament.includes(payload))
            // Filtra la lista de perros por temperamento basado en la carga útil recibida
            return {
                ...state,
                allDogs: [...filter], // Actualiza la lista de todas las razas de perros filtradas por temperamento
            };

        case ORDERBYKG:
            let orderByWeight;
            if (payload === "Menor peso") {
                orderByWeight = state.allDogs.sort((a, b) => {
                    const weightA = typeof a.weight.imperial === 'string' ? parseInt(a.weight.imperial.split(" - ")[0]) : 0;
                    const weightB = typeof b.weight.imperial === 'string' ? parseInt(b.weight.imperial.split(" - ")[0]) : 0;
                    return weightA - weightB;
                });
            } else {
                orderByWeight = state.allDogs.sort((a, b) => {
                    const weightA = typeof a.weight.imperial === 'string' ? parseInt(a.weight.imperial.split(" - ")[0]) : 0;
                    const weightB = typeof b.weight.imperial === 'string' ? parseInt(b.weight.imperial.split(" - ")[0]) : 0;
                    return weightB - weightA;
                });
            }

            return {
                ...state,
                allDogs: [...orderByWeight]
            };



        case ORIGIN:
            let nameObjects;
            if (payload === "Created") {
                // Si la carga útil es "Created", se realiza la siguiente operación
                nameObjects = state.filtered.filter(obj => obj.hasOwnProperty("years"));
            } else if (payload === "Api") {
                // Si la carga útil es "Api", se realiza la siguiente operación
                nameObjects = state.filtered.filter(obj => obj.hasOwnProperty("life_span"));
            }
            return {
                ...state,
                allDogs: [...nameObjects], // Actualiza la lista de todas las razas de perros según su origen
            };

        default:
            return state;
    }
}
export default rootReducer;
