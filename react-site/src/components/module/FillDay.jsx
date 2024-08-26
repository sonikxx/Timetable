import { useEffect } from 'react'

// var flag = false;

function FillDay() {
    useEffect(() => {
        const modules = document.getElementsByClassName("block");
         let url = '';
         let url_id = '';
         if(localStorage['type_input'] === 'преподаватель') {
            const teacher_id = localStorage['object_id'];
            const start_date = localStorage['first_day'];
            const end_date = localStorage['last_day'];
            url = `http://127.0.0.1:8000/lessons/teacher/${teacher_id}/${start_date}/${end_date}`;
            url_id = `http://127.0.0.1:8000/lessons/teacher/id/${teacher_id}/${start_date}/${end_date}`;
        } else if(localStorage['type_input'] === 'кабинет') {
            const classroom_id = localStorage['object_id'];
            const start_date = localStorage['first_day'];
            const end_date = localStorage['last_day'];
            url = `http://127.0.0.1:8000/lessons/classroom/${classroom_id}/${start_date}/${end_date}`;
            url_id = `http://127.0.0.1:8000/lessons/classroom/id/${classroom_id}/${start_date}/${end_date}`;
        } else if(localStorage['type_input'] === 'группа') {
            const group_id = localStorage['object_id'];
            const start_date = localStorage['first_day'];
            const end_date = localStorage['last_day'];
            url = `http://127.0.0.1:8000/lessons/group/${group_id}/${start_date}/${end_date}`;
            url_id = `http://127.0.0.1:8000/lessons/group/id/${group_id}/${start_date}/${end_date}`;
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < modules.length; ++i) {
                    var names = modules[i].getElementsByClassName("name__lesson");
                    for (let j = 0; j < names.length; ++j) {
                        names[j].innerHTML = data[i][j];
                    }
                }
            });
         fetch(url_id)
            .then(response => response.json())
            .then(data => {
                 for (let i = 0; i < modules.length; ++i) {
                    var names = modules[i].getElementsByClassName("name__lesson");
                    for (let j = 0; j < names.length; ++j) {
                        localStorage.setItem(`id_${i}_${j}`, data[i][j]);
                    }
                }
            });
    }, [])
}

export default FillDay;