import SectionOne from './SectionOne';
import SectionTwo from './SectionTwo';
import { useEffect } from 'react';

export default function Index() {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <SectionOne />

            <SectionTwo />
        </>
    )
}
