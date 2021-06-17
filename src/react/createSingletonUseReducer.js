import { useState, useRef, useMemo } from 'react';
import Subject from '../pattern/observer/Subject';

export default function createSingletonUseReducer(reducer, initialState) {

    let subject = new Subject(initialState);

    return function () {
        const [state, setState] = useState(initialState);

        const id = useRef();
        useMemo(() => {
            id.current = { update: setState };
            subject.register(id.current);
        }, [id]);

        function dispatch(action) {
            const nextState = reducer(state, action);
            subject.setState(nextState);
        }

        return [state, dispatch];
    }
}