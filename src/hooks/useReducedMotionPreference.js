import { useSyncExternalStore } from 'react';

const query = '(prefers-reduced-motion: reduce)';
const getSnapshot = () => window.matchMedia(query).matches;
const getServerSnapshot = () => true;

function subscribe(onChange) {
    const media = window.matchMedia(query);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
}

export default function useReducedMotionPreference() {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
