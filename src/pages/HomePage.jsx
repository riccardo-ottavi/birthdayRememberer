import { useState, useEffect } from "react";

export default function HomePage() {

    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        isSomebodyBirthday(now.toLocaleDateString("it-IT"))
    }, [now.toLocaleDateString("it-IT")])

    function isSomebodyBirthday(todayDate){ 
        
    }

    return (
        <>
            <h1>Sono la homepage</h1>
            <h2>
                {now.toLocaleDateString("it-IT")} -{" "}
                {now.toLocaleTimeString("it-IT")}
            </h2>
        </>
    );
}