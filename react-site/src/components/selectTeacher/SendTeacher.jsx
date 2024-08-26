import { my_storage } from '../../storage/storage.js'
import { useEffect } from 'react'

function SendTeacher() {
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/teachers')
        .then(response => response.json())
        .then(data => {
            var array = data.map(item => item[0]);
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

export default SendTeacher;