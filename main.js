(function () {
    fetch('https://see-bee9.github.io/main.json')
        .then(r => r.json())
        .then(d => console.log(d));
})()