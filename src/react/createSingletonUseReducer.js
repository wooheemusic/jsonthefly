import { useState, useEffect, useRef } from 'react';
import Subject from '../pattern/observer/Subject';

export default function createSingletonUseReducer(reducer, initState, bindAnother) {
  
    const subject = initState instanceof Subject? initState : new Subject(initState);

    const getSubjectState = subject.getState.bind(subject)
    function dispatch(action) {
        subject.setState(s => reducer(s, action));
    }
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

        return [state, dispatch];
    }
}