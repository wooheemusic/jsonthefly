import { useState, useEffect, useRef, useMemo } from 'react';
import Subject from '../pattern/observer/Subject';

export default function createSingletonUseReducer(reducer, initialState, bindAnother) {

    let subject = new Subject(initialState);
    typeof bindAnother === 'function' && bindAnother(subject.setState.bind(subject), subject.getState());

    return function () {
        const [state, setState] = useState(initialState);
        const id = useRef();
        useMemo(() => {
            id.current = { update: setState };
            subject.register(id.current);
        }, [id]);

        useEffect(() => () => {
            subject.unregister(id.current),
        }, []) 

        function dispatch(action) {
            const nextState = reducer(state, action);
            subject.setState(nextState);
        }

        return [state, dispatch];
    }
}