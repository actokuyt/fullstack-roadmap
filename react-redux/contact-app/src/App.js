import React from 'react';
import PeopleList from './components/PeopleList';
import Header from './components/Header';
import AddPersonForm from './components/AddPersonForm';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  contacts: ["James Smith", "Thomas Anderson", "Bruce Wayne"]
};

// Reducer function
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PERSON':
      return {
        ...state,
        contacts: [...state.contacts, action.data]
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <div className='w-4/5 min-h-96  mt-16  bg-slate-300 rounded-2xl lg:w-2/5 m-auto' >
        <Header />
        <AddPersonForm />
        <PeopleList />
      </div>
    </Provider>
  );
}

export default App;
