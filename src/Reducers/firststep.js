import {RECEIVE_FACEBOOK_API,receiveDataFacebook} from '../Actions/index';

export default function firststep(state = {datas:{}},action)
{
    console.log(action.type);
    switch(action.type)
    {
        case RECEIVE_FACEBOOK_API:
        return  {
            datas: action.datas,
        };
        default:
        return state;
    }
}
