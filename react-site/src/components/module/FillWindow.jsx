import { my_storage } from '../../storage/storage.js'

function FillWindow(id) {
    if (id === undefined) return;
    var modals = document.getElementById("myModal");
    var blocks = document.getElementsByClassName("block");
    var modals_titles = document.getElementsByClassName("modal__title")[0];
    var tables = modals.getElementsByClassName("table");
    var line = modals.getElementsByClassName("lower__line");
    var type = modals.getElementsByClassName("type__lesson");
    var lessons = blocks[id].getElementsByClassName("name__lesson");
    let buttons = modals.getElementsByClassName("picture__delete")
    let buttons__change = modals.getElementsByClassName("picture__change")
    let buttons__change__wraper = modals.getElementsByClassName("change__lesson")
    modals_titles.innerHTML = blocks[id].childNodes[0].innerHTML;
    var counter = 0;
    for (let j= 0; j < tables.length; ++j) {
        if (lessons[j].innerHTML !== "") {
            const lesson_id = localStorage[`id_${id}_${j}`];
            console.log("Item", id, j, lesson_id);
            if(lesson_id !== 'null') {
                fetch(`http://127.0.0.1:8000/lessons/${lesson_id}`)
                .then(response => response.json())
                .then((function(counter) {
                    return function (data) {
                        tables[j - counter].innerHTML = lessons[j].innerHTML;
                        buttons[j - counter].setAttribute("id_lesson_delete", j);
                        buttons__change[j - counter].setAttribute("id_lesson_change", j);
                        buttons__change__wraper[j - counter].setAttribute("id_lesson_change", j);
                        type[j - counter].innerHTML = data['lesson_type'];
                        type[j - counter].style.display = 'block';
                        var time = my_storage.time[j];
                        if (localStorage.getItem('type_input') === 'группа') {
                            var teacher_name = data['teacher'];
                            var class_name = data['classroom'];
                            if (teacher_name === "") {
                                line[j - counter].innerHTML = time + " / " + class_name;
                            } else {
                                line[j - counter].innerHTML = time + " / " + teacher_name + " / " + class_name;
                            }
                        }
                        if (localStorage.getItem('type_input') === 'преподаватель') {
                            var group_name = data['group'];
                            class_name = data['classroom'];
                            line[j - counter].innerHTML = time + " / " + group_name + " / " + class_name;
                        }
                        if (localStorage.getItem('type_input') === 'кабинет') {
                            teacher_name = data['teacher'];
                            group_name = data['classroom'];
                            if (teacher_name === "") {
                                line[j - counter].innerHTML = time + " / " + group_name;
                            } else {
                                line[j - counter].innerHTML = time + " / " + teacher_name + " / " + group_name;
                            }
                        }
                    }
                })(counter));
            }
        } else {
            ++counter;
        }
    }
}

export default FillWindow;