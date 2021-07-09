import {take, takeEvery, takeLatest, takeLeading, put, call, fork} from 'redux-saga/effects';

// const wait = (t) => new Promise(resolve => {
//     setTimeout(resolve, t);
// })

async function swapiGet (pattern) {
    const request =  await fetch(`http://swapi.dev/api/${pattern}/`);
    const data = await request.json();

    return data;
}

function* loadPeople() {
    const people = yield call(swapiGet, 'people');
    
    yield put({type: 'SET_PEOPLE', payload: people.results});
}
function* loadPlanets() {
    const planets = yield call(swapiGet, 'planets');

    yield put({type: 'SET_PLANETS', payload: planets.results});
}

export function* workerSaga () {
    yield fork(loadPeople);
    yield fork(loadPlanets);
 
}

export function* watchLoadDataSaga () {
    yield takeEvery('LOAD_DATA', workerSaga);
    
}

export default function* rootSaga() {
    yield fork(watchLoadDataSaga);
}