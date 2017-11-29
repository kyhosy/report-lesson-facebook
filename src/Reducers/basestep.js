import {RECEIVE_FACEBOOK_API_BASE,REQUEST_FETCH_FACEBOOK_API_BASE} from '../Actions/index';
import {checkNotNull} from '../Utils/Utils';

export default function basestep(state = [],action)
{
    console.log(JSON.stringify(action));
    

    switch(action.type)
    {
        case RECEIVE_FACEBOOK_API_BASE:
        
        if(checkNotNull(action.datas))
        {
            if(checkNotNull(state.datas))
            {
                return  {
                    datas: [...state.datas,...action.datas]
                };
            }
            return {
                datas: [,...action.datas]
            };
        };
        return state;
        case REQUEST_FETCH_FACEBOOK_API_BASE:
            return [];
        default:
        return state;
    }
}
