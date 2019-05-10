import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from "./types";


export const getItems = () =>
{
    return {
        // sending just the type temporarily
        type: GET_ITEMS
    };
};