import { useEffect } from 'react'

function SendWeek() {
    useEffect(() => {
                 fetch('http://127.0.0.1:8000/api/weeks')
        .then(response => response.json())
        .then(data => {
            var array = data
            var select = document.getElementsByTagName("select")[0];
            array.forEach(function (v, k) {
                var option = document.createElement("option");
                option.value = k;
                option.innerHTML = v;
                select.appendChild(option);
            });
        })
    }, [])
}

export default SendWeek;