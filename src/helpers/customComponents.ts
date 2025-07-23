import TextInput from "../components/TextInput.vue";
import Sidebar from "../containers/Sidebar.vue";
import  Card from "../components/Card.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import TextAreaInput from "../components/TextAreaInput.vue";
import NumberInput from "../components/NumberInput.vue";

export default function customComponents(app: any) {
    app.component("TextInput", TextInput);
    app.component("Sidebar", Sidebar);
    app.component("Card", Card);
    app.component("CustomButton", Button);
    app.component("Modal", Modal);
    app.component("TextAreaInput", TextAreaInput);
    app.component('NumberInput', NumberInput);
}