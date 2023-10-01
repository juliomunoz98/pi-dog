import { FULLDOGS, FILTERTEMP, ORDERALPH, ORDERBYKG, ORIGIN } from "../Actions/Types";


export function filterTemp(status) {
    return {
        type: FILTERTEMP,
        payload: status
    }

}

export function orderByKg(status) {
    return {
        type: ORDERBYKG,
        payload: status
    }

}
export function orderAplh(status) {
    return {
        type: ORDERALPH,
        payload: status
    }
}
export function origin(type) {
    return {
        type: ORIGIN,
        payload: type
    }
}

export function fullDogs(race) {

    return {
        type: FULLDOGS,
        payload: race
    }


}
