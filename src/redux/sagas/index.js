import {take, takeEvery, takeLatest, takeLeading, put, call, fork, spawn, join, select} from 'redux-saga/effects';

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

    return people;
}
function* loadPlanets() {
    const planets = yield call(swapiGet, 'planets');

    yield put({type: 'SET_PLANETS', payload: planets.results});
    console.log('load planets');
}

export function* workerSaga () {
    const task = yield fork(loadPeople);
    yield spawn(loadPlanets);
    
    const people = yield join(task);

    const store = yield select(store => store);

    // console.log('finish parallel tasks', people);
    console.log('finish parallel tasks', store);
}

export function* watchLoadDataSaga () {
    yield takeEvery('LOAD_DATA', workerSaga);
    
}

export default function* rootSaga() {
    yield fork(watchLoadDataSaga);
}