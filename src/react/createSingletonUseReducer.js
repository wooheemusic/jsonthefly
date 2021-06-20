import { useState, useEffect, useRef } from 'react';
import Subject from '../pattern/observer/Subject';

export default function createSingletonUseReducer(reducer, initialState, bindAnother) {

    let subject = new Subject(initialState);
    const getSubjectState = subject.getState.bind(subject)
    typeof bindAnother === 'function' && bindAnother(subject.setState.bind(subject));

    return function () {
        const [state, setState] = useState(getSubjectState);
        const id = useRef();

        useEffect(() => {
            id.current = { update: setState };
            subject.register(id.current);
            return () => {
                subject.unregister(id.current);
            }
        }, [id])

        function dispatch(action) {
            const nextState = reducer(state, action);
            subject.setState(nextState);
        }

        return [state, dispatch];
    }
}