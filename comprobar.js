#!/usr/bin/env node

/** Copyright (c) 2012-2019 Juan Francisco Cantero Hurtado <iam@juanfra.info>
 *  Permission to use, copy, modify, and distribute this software for any
 *  purpose with or without fee is hereby granted, provided that the above
 *  copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

const https = require('node:https');
const fs = require('node:fs/promises');
const os = require('node:os');

const FILE_PATH = './mis_numeros.txt';
const API_URL = 'https://api.elpais.com/ws/LoteriaNavidadPremiados';

(async function init() {
  const [playedNumbers, lotteryStatus] = await Promise.all([
    getPlayedNumbers(),
    getLotteryStatus(),
  ]);

  printLotteryStatus(lotteryStatus);
  let totalWonned = 0.0;
  let totalPlayed = 0.0;

  for (let playedNumber of playedNumbers) {
    let [numberPlayed, moneyPlayed] = playedNumber.split(':');
    numberPlayed = numberPlayed.trim();
    moneyPlayed = parseFloat(moneyPlayed.trim());
    const numberInfo = await getLotteryNumberInfo(numberPlayed);
    const prize = numberInfo.hasOwnProperty('premio') ? numberInfo.premio : 0;
    const moneyWonned = (moneyPlayed * prize) / 20;

    totalWonned += moneyWonned;
    totalPlayed += moneyPlayed;

    printResultByNumber(numberPlayed, moneyPlayed, moneyWonned);
  }

  printResultTotal(totalPlayed, totalWonned);
})();

/* cmd.exe con la fuente por defecto (Raster Fonts) no puede mostrar €  */
function getCurrency() {
  return os.platform() == 'win32' ? 'EUR' : '€';
}

function httpGet(URL) {
  return new Promise((resolve, reject) => {
    https
      .get(URL, (res) => {
        let body = '';

        res.on('data', (chunk) => {
          body += chunk;
        });

        res.on('end', () => {
          resolve(body);
        });
      })
      .on('error', (e) => {
        reject(e);
      });
  });
}

async function getLotteryStatus() {
  let status = -1;

  try {
    const response = await httpGet(`${API_URL}?s=1`);
    const sanitizedResponse = JSON.parse(response.replace('info=', ''));
    status = sanitizedResponse.status;
  } catch (e) {
    console.log(e);
  }

  return status;
}

async function getLotteryNumberInfo(number) {
  let value = '';

  try {
    const response = await httpGet(`${API_URL}?n=${number}`);
    const sanitizedResponse = JSON.parse(response.replace('busqueda=', ''));
    value = sanitizedResponse;
  } catch (e) {
    console.log(e);
  }

  return value;
}

function getPlayedNumbers() {
  return new Promise((resolve, reject) => {
    fs.readFile(FILE_PATH, { encoding: 'utf8' })
      .then((fileData) => {
        const fileDataSanitized = fileData.trim();
        const playedNumbers = fileDataSanitized
          .split('\n')
          .filter((number) => number !== '')
          .map((number) =>
            number.replace(' ', '').replace(',', '.').replace('=', ':')
          );

        resolve(playedNumbers);
      })
      .catch(reject);
  });
}

function printLotteryStatus(statusCode) {
  const STATUS_MESSAGE = {
    0: 'El sorteo no ha comenzado aún. Todos los números aparecerán como no premiados.',
    1: 'El sorteo ha empezado. Lista de premios parcial.',
    2: 'El sorteo ha empezado. La lista de números premiados se va cargando poco a poco. Un número premiado podría llegar a tardar unos minutos en aparecer.',
    3: 'El sorteo ha terminado y existe una lista oficial en PDF.',
    4: 'El sorteo ha terminado y la lista de números y premios está basada en la oficial. De todas formas, recuerda que la única lista oficial es la que publica la ONLAE y deberías comprobar todos tus números contra ella.',
  };

  console.log('MENSAJE DEL SERVIDOR: ');
  console.log(STATUS_MESSAGE[statusCode]);
}

function printResultByNumber(numberPlayed, moneyPlayed, moneyWinned) {
  console.log(`\n=============================`);
  console.log(`Número: ${numberPlayed}`),
  console.log(`Jugado: ${moneyPlayed} ${getCurrency()}`);
  console.log(`Ganado: ${moneyWinned} ${getCurrency()}`);
}

function printResultTotal(totalPlayed, totalWinned) {
  console.log(`\n=============================`);
  console.log(`Total Jugado = ${totalPlayed} ${getCurrency()}`);
  console.log(`Total Ganado = ${totalWinned} ${getCurrency()}`);
  console.log(`Saldo = ${totalWinned - totalPlayed} ${getCurrency()}`);
}

