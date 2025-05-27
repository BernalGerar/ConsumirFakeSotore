const errorMessage = /<pre>(.*?)<\/pre>/;

export async function handleResponseError (res) {
    const errorM = ( await res.text() ).match(errorMessage)[1];
    console.error( errorM );
}

export async function isResponseInvalid(data) {
    const state = data.length && data !== "null" ? false : true;
    state ? console.error("El producto no existe, id incorrecto") : false;
    return state;
}

export function processRequest(request) {
    const method = request[0];
    const endpoint = method === "POST" ? request.slice(1, 2) : request.slice(1);
    const elements = request.slice(2);
    const body = elements.length !== 0 ? {
        "title": elements[0],
        "price": elements[1],
        "category": elements[2]
    } : {};
    return [
        method,
        "/" + endpoint,
        body
    ]
}