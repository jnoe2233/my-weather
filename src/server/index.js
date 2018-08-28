import express from 'express';
import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import App from '../components/App';
import { fetchPopularRepos } from '../components/api';

const app = express();
const port = '3006';

app.use(cors());
app.use(express.static('public'));

app.get('*', (req, res, next) => {
    fetchPopularRepos().then(data => {
        const markup = renderToString(
            <App data={data} />
        );

        res.send(
            `<!DOCTYPE html>
        <html>
              <head>
                <title>My Weather | JN</title>
                <script src='/bundle.js' defer></script>
                <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
                <link rel="stylesheet" type="text/css" href="/main.css">
                <link href="https://fonts.googleapis.com/css?family=Kosugi+Maru" rel="stylesheet">
                </head>
        
              <body>
                <div id="app">${markup}</div>
              </body>
        </html>`
        );
    });
});

app.listen(port, () => {
    console.log(` Server is listening on port: ${port}`);
});