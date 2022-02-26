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
        await getLinkPreview(location.url)
            .then(async d => {
                if (d.description && !location.description)
                    location.description = d.description;

                if (d.images && d.images.length > 0) {
                    const bestGuess = d.images[0];
                    const baseName  = path.basename(bestGuess);


                    const filename = `${fileBase}${baseName}`;
                    if (!location.image) {
                        client.get(bestGuess, (response) => {
                            console.log(filename);
                            response.pipe(createWriteStream(filename))
                        })
                    }
                    console.log(baseName);
                    console.log(bestGuess);
                    if (!location.image) location.image = filename.replace('./src', '');
                }
            });
    }
    writeFile(fileName, JSON.stringify(file), err => {
    })
}


