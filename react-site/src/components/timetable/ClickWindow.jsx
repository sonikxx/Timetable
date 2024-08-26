import FillWindow from '../module/FillWindow'
import ClearWindow from '../module/ClearWindow'

function ClickWindow(event, props) {
    var modal = document.getElementById("myModal");
    if (event.target.tagName === "SPAN" || event.target === modal) {
        ClearWindow();
        modal.style.visibility = "hidden";
        modal.getElementsByClassName("button__insert")[0].style.display = "none";
        if (localStorage.getItem('role') === 'adm') {
            let buttons = modal.getElementsByClassName("two__button")
            for (let i = 0; i < buttons.length; ++i) {
                buttons[i].style.display = "none";
            }
        }
    } else {
        if (event.target.classList.contains("modal__content") || props.id_block === undefined) {
            return;
        }
        if (props.id_block !== undefined && !event.target.classList.contains("delete__yes")) {
            var modal_delete = document.getElementsByClassName("modal__delete")[0];
            modal_delete.setAttribute('id_block', props.id_block);
            var button_delete = document.getElementsByClassName("delete__yes")[0];
            button_delete.setAttribute('id_block', modal_delete.getAttribute('id_block'));
        }
        if (props.id_block !== undefined && !event.target.classList.contains("change__yes")) {
            modal_delete = document.getElementsByClassName("modal__change")[0];
            modal_delete.setAttribute('id_block', props.id_block);
            var button_change = document.getElementsByClassName("change__yes")[0];
            button_change.setAttribute('id_block', modal_delete.getAttribute('id_block'));
        }
        FillWindow(props.id_block);
        if (localStorage.getItem('role') === 'adm') {
            modal.getElementsByClassName("button__insert")[0].style.display = "block";
            let buttons = modal.getElementsByClassName("two__button")
            let counter = 0;
            for (let i = 0; i < buttons.length; ++i) {
                if (localStorage[`id_${props.id_block}_${i}`] !== 'null') {
                    buttons[i - counter].style.display = "block";
                } else {
                    ++counter;
                }
            }
        }
        modal.style.visibility = "visible";
    }
}

export default ClickWindow;
