import { isResponseInvalid, handleResponseError } from "./utils.js";

export async function getRequest(url, method) {
    try {
        const config = {
            method: method,
            headers: {
                "Accept": "application/json"
            }
        }

        const res = await fetch(url, config);

        if(!res.ok) {
            await handleResponseError(res);
            return;
        }

        const data = await res.text();
        !( await isResponseInvalid( data ) ) && console.log("Producto/s:\n", JSON.parse( data ) )

    } catch(err) {
        console.error("Algo fue mal\n", err.message);
    }
}

export async function postRequest(url, method, product) {
    try {
        const config = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(product)
        }

        const res = await fetch(url, config);

        if(!res.ok) {
            await handleResponseError(res);
            return;
        }

        console.log("Se agregó el siguiente producto: ");
        console.log( await res.json() );

    }catch(err) {
        console.error("Algo fue mal\n", err.message);
    }
}

export async function deleteRequest(url, method) {
    try {
        const config = {
            method: method,
            headers: {
                "Accept": "application/json"
            }
        }
        const res = await fetch(url, config);

        if(!res.ok) {
            await handleResponseError(res);
            return;
        }

        const data = await res.text();
        !( await isResponseInvalid(data) ) && console.log("Se eliminó el siguiente producto:\n", JSON.parse(data) );

    }catch(err) {
        console.error("Algo salio mal !!");
        console.log(err.message);
    }
}