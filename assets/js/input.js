document.querySelector("body").addEventListener("keypress", function (evt) {
    if (evt.key == "'" || evt.key == '"') {
        evt.preventDefault();
    }
});