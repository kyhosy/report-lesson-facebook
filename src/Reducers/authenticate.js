import {RECEIVE_TOKEN_FACEBOOK,receiveTokenFacebook} from '../Actions/index';

export default function authenticateFacebook(state = [],action)
{
    console.log(action.type);
    switch(action.type)
    {
        case RECEIVE_TOKEN_FACEBOOK:
        return  {
            token: action.token,
        };
        default:
        return state;
    }
}
