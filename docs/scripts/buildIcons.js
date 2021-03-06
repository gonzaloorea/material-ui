/* eslint-disable no-console */

import path from 'path';
import gm from 'gm';

const SIZES = [48, 70, 96, 150, 152, 192, 256, 310, 384, 512];
const INPUT_ICON = path.join(__dirname, '../../static/logo.png');
const OUTPUT_DIR = path.join(__dirname, '../../static/icons');

console.log('Generating Icons');

const promises = SIZES.map(
  size =>
    new Promise((resolve, reject) => {
      gm(INPUT_ICON)
        .resize(size, size)
        .write(path.join(OUTPUT_DIR, `${size}x${size}.png`), err => {
          if (err) {
            reject(err);
            return;
          }

          resolve();
          console.log(`Size ${size} created`);
        });
    }),
);

Promise.all(promises).catch(err => {
  setTimeout(() => {
    console.log(err);
    throw err;
  });
});
