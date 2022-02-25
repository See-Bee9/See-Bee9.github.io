(function () {

    document.getElementById('hamburger')
            .addEventListener('click', () => {
                document.getElementById("navbarBasicExample")
                        .classList.toggle('is-active');
            })
    const content = document.querySelector('#content');
    fetch("/json/main.json")
        .then(response => response.json())
        .then(data => processData(data));

    const processData = (data) => {
        for (const location of data) {
            const template = document.querySelector('#content-template');
            const clone    = template.content.cloneNode(true);

            const title     = clone.querySelector('.title')
            title.innerHTML = location.title;
            title.setAttribute('href', location.url);

            clone.querySelector('.description')
                .innerHTML = location.description;

            clone.querySelector(".preview")
                 .setAttribute("src", location.image);


            content.appendChild(clone);

        }
    }
})()
