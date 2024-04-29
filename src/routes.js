const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const herokuRouter = require('./v1/heroku');
const assetRouter = require('./assets');

const herokuRouteRoot = "/v1/heroku";
const homePage = fs.readFileSync('./src/index.html', 'utf8');
const routes = [...assetRouter.routes, {
    routes: herokuRouter.routes,
    rootPath: herokuRouteRoot
}];

const dom = new JSDOM(homePage);
const document = dom.window.document;
const routesListContainer = document.getElementById('routes');

for (const route of routes) {
    if ("rootPath" in route && "routes" in route) { 
        const routeURL = route.rootPath;
        const routes = route.routes;

        for (const route of routes) {
            const modifiedRoute = { ...route };
            modifiedRoute.pattern = routeURL + modifiedRoute.pattern;
            appendUrlToList(modifiedRoute);
        }
    } else {
        appendUrlToList(route);
    }
}

function appendUrlToList(route) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${route.method.toUpperCase()}: <a href="${route.pattern}">${route.pattern}</a>`;
    routesListContainer.appendChild(listItem);
}

const homeHTML = document.documentElement.outerHTML;

module.exports = {homeHTML, herokuRouteRoot}
