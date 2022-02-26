// import {writeFileAsync} from 'fs';
// import {readFile} from 'fs/promises';

import { readFile, writeFile, createWriteStream } from 'fs';
import { getLinkPreview } from "link-preview-js";
import path from 'path';
import * as client from 'https';

const fileName = './json/main.json';
const fileBase = './img/';

const file = [];

await readFile(fileName, 'utf8', async (err, data) => {
    const parsed = JSON.parse(data);
    file.push(...parsed);
    console.log(file);
    await getImages();
});

const getImages = async () => {
    for (let i = 0; i < file.length; i++) {
        const location = file[i];
        console.log(location.url);
        if (!location.image || !location.description) {
            await getLinkPreview(location.url)
                .then(async d => {
                    if (d.description && !location.description)
                        location.description = d.description;

                    if (d.images && d.images.length > 0) {
                        const bestGuess = d.images[0].split('?')[0];
                        console.log(bestGuess);
                        const baseName = path.basename(bestGuess);


                        const filename = `${fileBase}${baseName}`;
                        if (!location.image) {
                            client.get(bestGuess, (response) => {
                                console.log(filename);
                                response.pipe(createWriteStream(filename))
                            })
                        }
                        if (!location.image) location.image = filename.split('?')[0].replace('./src', '');
                    }
                })
        }
    }
    const sorted = [...file].sort(function (a, b) {
        if (a.title === b.title) return 0
        if (a.title > b.title) return 1;
        return -1;
    })
    const output = JSON.stringify(sorted);

    writeFile(fileName, output, err => {
    })
}


