import { getRequest, postRequest, deleteRequest } from "./sendRequest.js";
import { processRequest } from "./utils.js";

const FakeStoreURL = "https://fakestoreapi.com";

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