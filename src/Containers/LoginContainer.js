import React from 'react';
// import PropTypes from 'prop-types'
// import FacebookLogin from 'react-facebook-login';
import {receiveTokenFacebook} from '../Actions/index'
import {connect} from 'react-redux';
import LoginComponent from '../LoginComponent/LoginComponent'


const mapStateToProps = (state) => {
    return {
        token: !state.authenticateFacebook?"--- abx": state.authenticateFacebook.token
    }
}

const mapDispatchToProps = (dispatch) => ({
    authenticate: (rs) =>{
        dispatch (receiveTokenFacebook(rs))
    }
  })

const LoginContainer = connect(mapStateToProps,mapDispatchToProps)(LoginComponent);

export default LoginContainer;