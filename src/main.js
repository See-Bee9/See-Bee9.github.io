(function () {
    const generate = (title, desciption, url) => {
        return {
            'title'      : title,
            'description': desciption,
            'url'        : url
        };
    }

    const content = document.querySelector('#content');
    fetch("/json/main.json")
        .then(response => response.json())
        .then(data => processData(data));

    const processData = (data) => {
        for (const location of data) {
            if ('content' in document.createElement('template')) console.log('We have a template');
            const template = document.querySelector('#content-template');
            const clone    = template.content.cloneNode(true);

            const title     = clone.querySelector('.title')
            title.innerHTML = location.title;
            title.setAttribute('href', location.url);

            clone.querySelector('.description')
                .innerHTML = location.description;


            content.appendChild(clone);

        }
    }
})()
