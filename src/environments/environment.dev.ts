export const environment = {
    prod: false,
    apiUrl: "http://localhost:5001/api/",
    graphUrl: "ws://localhost:5001/graphql/",
    getApiDomain: () => new URL(environment.apiUrl).hostname,
}