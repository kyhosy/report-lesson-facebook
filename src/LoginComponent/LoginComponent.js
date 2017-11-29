import React from 'react';
import PropTypes from 'prop-types'
import FacebookLogin from 'react-facebook-login';
import {receiveTokenFacebook} from '../Actions/index'
import {connect} from 'react-redux';
import {isHasToken} from '../Utils/Utils';
import styles from './LoginComponent.css';


// const mapDispatchToProps = dispatch => {
//   return {
//     authenticate: response  => {
//       dispatch(receiveTokenFacebook(response))
//     }
//   }

// }

const mapStateToProps = (state) => {
  // console.log("state login ..."+JSON.stringify(state));
  return {
      token: !isHasToken(state.authenticateFacebook)?"--- abx": state.authenticateFacebook.token
  }
}

const mapDispatchToProps = (dispatch) => ({
  authenticate: (rs) =>{
      dispatch (receiveTokenFacebook(rs))
  },
})


const LoginComponent = ({token,authenticate}) => (
    <div name="LoginComponent" >
      <h1> Facebook Auth</h1>
      <FacebookLogin
        appId = "128882537799717"
        callback = {authenticate}/>
      <a>Token</a>
      <i>{token}</i>
    </div>
)

LoginComponent.propTypes = {
  authenticate: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginComponent);

// LoginComponent = connect(mapDispatchToProps)(LoginComponent);

// export default LoginComponent;