function ClearWindow() {
    var modals = document.getElementById("myModal");
    var tables = modals.getElementsByClassName("table");
    var line = modals.getElementsByClassName("lower__line");
    var type = modals.getElementsByClassName("type__lesson");
    var buttons = modals.getElementsByClassName("two__button");
    for (let j = 0; j < tables.length; ++j) {
        tables[j].innerHTML = "";
        type[j].innerHTML = "";
        type[j].style.display = 'none';
        line[j].innerHTML = "";
    }
    for (let i = 0; i < buttons.length; ++i) {
        buttons[i].style.display = "none";
    }
    modals.getElementsByClassName("button__insert")[0].style.display = "none";
    // var modalDelete = document.getElementsByClassName("modal__delete")[0];
    // modalDelete.style.visibility = "hidden";
}

export default ClearWindow;
