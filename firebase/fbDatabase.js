import { app } from "./fbConfig";
import { getDatabase, ref, get, push, set, onValue, remove, update } from "firebase/database";

const database = getDatabase(app);

const dbFunctions = {
    ref,
    get,
    push,
    set,
    onValue,
    remove,
    update
};

export { database, dbFunctions };
