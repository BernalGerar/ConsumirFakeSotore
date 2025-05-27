const FakeStoreURL = "https://fakestoreapi.com";
const errorMessage = /<pre>(.*?)<\/pre>/;

function processRequest(request) {
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

async function handleResponseError (res) {
    const errorM = ( await res.text() ).match(errorMessage)[1];
    console.error( errorM );
}

async function isResponseInvalid(data) {
    const state = data.length && data !== "null" ? false : true;
    state ? console.error("El producto no existe, id incorrecto") : false;
    return state;
}

async function getRequest(url, method) {
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

async function postRequest(url, method, product) {
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

async function deleteRequest(url, method) {
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

export default function requestToFakeStore(request) {
    const [method, endpoint, body] = processRequest(request);
    //console.log(method, endpoint, body);
    
    switch(method) {
        case "GET":
            getRequest(FakeStoreURL + endpoint, method)
        break;

        case "POST":
            postRequest(FakeStoreURL + endpoint, method, body)
        break;

        case "DELETE":
            deleteRequest(FakeStoreURL + endpoint, method)
        break;

        default:
            console.error("Solo se admiten tres métodos: POST, GET, DELETE.");
            console.log("Recordá que los métodos deben escribirse en mayúsculas (por ejemplo: 'GET').");
        break;
    }

}

//requestToFakeStore(process.argv.slice(2));