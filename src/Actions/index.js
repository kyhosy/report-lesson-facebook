import graph from 'fb-react-sdk';
import {checkNotNull} from '../Utils/Utils'

export const REQUEST_FACEBOOK_AUTHENTICATE = "REQUEST_AUTHENTICATE";
export const RECEIVE_FACEBOOK_AUTHENTICATE = "RECEIVE_FACEBOOK_AUTHENTICATE";
export const RECEIVE_TOKEN_FACEBOOK = "RECEIVE_TOKEN_FACEBOOK";


export const SELECTED_API_COMMENTS = "SELECTED_API_COMMENTS";
export const SELECTED_API_PHOTOS = "SELECTED_API_PHOTOS";
export const SELECTED_API_LIKES = "SELECTED_API_PHOTOS";
export const API_FACEBOOK = "API_FACEBOOK";
export const RECEIVE_FACEBOOK_API = "RECEIVE_FACEBOOK_API";
export const RECEIVE_FACEBOOK_API_BASE = "RECEIVE_FACEBOOK_API_BASE";
export const FETCH_FORMAT_REPORT = "FETCH_FORMAT_REPORT"

export const REQUEST_FETCH_FACEBOOK_API_BASE="REQUEST_FETCH_FACEBOOK_API_BASE";

export const requestAuthenticate = authenticate => ({
    type: REQUEST_FACEBOOK_AUTHENTICATE,
    authenticate,

})

export const receiveTokenFacebook = response => ({
    type : RECEIVE_TOKEN_FACEBOOK,
    token : response.accessToken,
})

// export const selectedAPIFacebookStep1 = selected => ({
//     type = API_FACEBOOK,
//     selected: selected,
// })

export const receiveDataFacebook = (response) =>({
    type : RECEIVE_FACEBOOK_API,
    // objectId : response.objectId,
    datas : response.data,
})

export const fetchPosts = url => (dispatch, getState) => {
    // dispatch(requestPosts(reddit))
    // return fetch(`https://www.reddit.com/r/${reddit}.json`)
    //   .then(response => response.json())
    //   .then(json => dispatch(receivePosts(reddit, json)))
    return graph.get(url,function(error,res)
    {
        console.log(res);
        if(res !== null)
        {
          dispatch(receiveDataFacebook(res));
        }
    })
  }

const receiveDataFacebookBase = (response,filter) =>({
    type : RECEIVE_FACEBOOK_API_BASE,
    datas : response.data.filter(item => checkNotNull(item.message) && item.message.toUpperCase().includes(filter.toUpperCase())) ,
    // datas : response.data,
})

export const fetchDatasBase = request => (dispatch, getState) =>
{
    return graph.get(request.url,function(error,res)
    {
        // console.log(res);
        if(res !== null)
        {
          dispatch(receiveDataFacebookBase(res,request.filter));
        }
    })
}

export const requestFetchDataBase = () =>
({
    type:REQUEST_FETCH_FACEBOOK_API_BASE,
})

export const fetchFormatReport =(formatText)=>
({
    type: FETCH_FORMAT_REPORT,
    formatText: formatText,
})