export default function changeOverlay(event, elem, state, changeState) {
    if (state) changeState(true);
    else if (!elem.contains(event.target)) {
        changeState(false);
    }
}