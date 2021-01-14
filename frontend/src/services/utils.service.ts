import { environment } from "../environments";

export const queryBuilder = query => {
    let queryBuilder = "?";

    Object.keys(query).forEach(key => {
        queryBuilder += `${key}=${JSON.stringify(query[key])}&`;
    });
    return queryBuilder;
};

export const put = async (route, object) => {
    console.log("ICIPut " + environment.apiUrl + route);
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    if (localStorage.getItem('token')) {
        headers["Authorization"] = localStorage.getItem('token');
    }
    return await fetch(environment.apiUrl + route, {
        method: "put",
        headers,
        body: JSON.stringify(object)
    });
};

export const get = async route => {
    console.log("ICIGet " + environment.apiUrl + route);
    const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    if (localStorage.getItem('token')) {
        headers["Authorization"] = localStorage.getItem('token');
    }
    return await fetch(environment.apiUrl + route, {
        method: "get",
        headers
    });
};

export const del = async route => {
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    if (localStorage.getItem('token')) {
        headers["Authorization"] = localStorage.getItem('token');
    }
    return await fetch(environment.apiUrl + route, {
        method: "delete",
        headers
    });
};

export const post = async (route, object) => {
    console.log("ICIPost " + environment.apiUrl + route);
    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    };
    if (localStorage.getItem('token')) {
        headers["Authorization"] = localStorage.getItem('token');
    }
    return await fetch(environment.apiUrl + route, {
        method: "post",
        headers,
        body: JSON.stringify(object)
    });
};
