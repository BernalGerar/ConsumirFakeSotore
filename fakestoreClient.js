const FakeStoreURL = "https://fakestoreapi.com";

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

async function getProduct(url, method) {
    const config = {
        method: method,
        headers: {
            "Accept": "application/json"
        }
    }
    const data = await fetch(url, config);
    console.log( await data.json() );
}

async function postProduct(url, method, product) {
    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(product)
    }
    const data = await fetch(url, config);
    console.log( await data.json() );
}

async function deleteProduct(url, method) {
    const config = {
        method: method,
        headers: {
            "Accept": "application/json"
        }
    }
    const data = await fetch(url, config);
    console.log( await data.json());
 }

export  function requestToFakeStore(request) {
    const [method, endpoint, body] = processRequest(request);
    console.log(method, endpoint, body);
    
    switch(method) {
        case "GET":
            getProduct(FakeStoreURL + endpoint, method)
        break;

        case "POST":
            postProduct(FakeStoreURL + endpoint, method, body)
        break;

        case "DELETE":
            deleteProduct(FakeStoreURL + endpoint, method)
        break;
    }

}

requestToFakeStore(process.argv.slice(2));