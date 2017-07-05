const GET_LIST = 'GET_LIST';

export const testAction = (data) => {
    return{
        type: GET_LIST,
        data,
    }
}