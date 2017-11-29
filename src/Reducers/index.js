import authenticateFacebook from './authenticate';
import firststep from './firststep';
import basestep from './basestep';
import finalstep from './finalstep';
import {combineReducers} from 'redux';


const rootReducer = combineReducers({
    finalstep,
    basestep,
    firststep,
    authenticateFacebook,
});

export default rootReducer;

