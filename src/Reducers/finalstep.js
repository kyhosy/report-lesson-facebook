import {FETCH_FORMAT_REPORT} from '../Actions/index';
import {checkNotNull} from '../Utils/Utils';

export default function finalstep(state = {formatText: "✿✿✿;●;✿✿ ĐÁP;✿ ✿ ✿;✿CÂU"},action)
{
    console.log(JSON.stringify(action));
    switch(action.type)
    {
        case FETCH_FORMAT_REPORT:
            return {formatText: action.formatText};
        default:
            return state;
    }
}
