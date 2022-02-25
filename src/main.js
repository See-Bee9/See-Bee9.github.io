(function () {


    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach( el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

    document.querySelectorAll('.navbar-item')
            .forEach(item => item.addEventListener('click', event => {
                const target = event.target.id.split('-')[1];
                document.querySelectorAll('.content')
                        .forEach(element => element.classList.add('hidden'));

                document.querySelector(`#${target}`)
                        .classList.remove('hidden');
            }));
    fetch("/json/main.json")
        .then(response => response.json())
        .then(data => processData(data));

    const processData = (data) => {

        for (const location of data) {
            const content = document.querySelector(`#${location.type}`);

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
