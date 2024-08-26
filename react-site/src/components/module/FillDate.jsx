import { useEffect } from 'react'

function FillDate() {
    useEffect(() => {

         fetch('http://127.0.0.1:8000/api/weeks')
        .then(response => response.json())
        .then(data => {
            const week = data[0];
            const first_day = week.split(" ")[0];
            const titles = document.getElementsByClassName("title");
            var parts = first_day.split(".");
            var dt = new Date(parseInt(parts[2], 10) + 2000, parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
            for (let i = 0; i < titles.length; ++i) {
            const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"]
            const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
            titles[i].innerHTML = days[dt.getDay()] + ", " + dt.getDate() + " " + months[dt.getMonth()];
            dt.setDate(dt.getDate() + 1);
        }
        });

    }, [])
}

export default FillDate;