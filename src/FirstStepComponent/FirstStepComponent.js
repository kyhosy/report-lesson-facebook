import React from 'react';
// import cssModule from 'react-css-modules';
import styles from './FirstStepComponent.css';
import Select from 'react-select';
import PropTypes from 'prop-types';
import graph from 'fb-react-sdk';
import ReactJson from 'react-json-view';
import {receiveDataFacebook,fetchPosts} from '../Actions/index';
import {connect} from 'react-redux';
import {isHasToken,checkNotNull} from '../Utils/Utils';
import 'react-select/dist/react-select.css';

const mapStateToProps = (state) => {
  // console.log("state ..."+JSON.stringify(state));
  var a = {
  
      token: !isHasToken(state.authenticateFacebook.token) ? state.authenticateFacebook.token : ""  ,
      options :  [
        { value: 'comments', label: 'comments' },
        { value: 'likes', label: 'likes' },
        { value: 'photos', label: 'photos' }
      ],
      reponseFacebook: checkNotNull(state.firststep)? state.firststep.datas: "" ,
  }
  // console.log("props ..."+JSON.stringify(a));
  return a;
} 

const mapDispatchToProps = (dispatch) => ({
  // reponseFacebook: (rs) =>{
  //     dispatch (receiveDataFacebook(rs))
  // },
  dispatch: dispatch
  
})

class FirstStepComponent extends React.Component {
  static propTypes = {
      token: PropTypes.string,
      options: PropTypes.array,
      selectedApi: PropTypes.string,
      // objectId: PropTypes.string.isRequired,
      // onFetchClick: PropTypes.func.isRequired,
      reponseFacebook: PropTypes.object.isRequired,
      dispatch: PropTypes.func.isRequired,

  }

  constructor(props) {
    super(props);
    
    // this.state = {selected: ""};
    this.state = {selected: this.props.options[2]};
  }

  selectChange(e)
  {
    console.log(e);
    this.setState({selected:e});
  }

  onFetchClick()
  {
    // let url = this.state.url + "/"+this.state.apiType;
    let url = this.refs.inputData.value + '/' + this.state.selected.value;
    console.log(url);
    console.log(this.props);
    var com = this;
    graph.setAccessToken(this.props.token);
    graph.setVersion("2.10");
    this.props.dispatch(fetchPosts(url));
  }

  render = () => 
  {
    return (
    
    <div className = "FirstStepComponent">
      <h1>First Step</h1>
      <div >
        <div className="row">
        <div className="col-sm-6">
          <a>Input ID</a>
        </div>
        <div className="col-sm-6">
          <input type = "text" className = "form-control" ref = "inputData"
              // value={this.state.selected} 
              defaultValue = '493790637443958'
               placeholder="Object ID facebook..." 
              name='name' 
              // onChange = {this.textChange}
           />
        </div>
        </div>
      </div>
      <div >
        <div className="row">
        <div className="col-sm-6">
          <a>Choose API:</a>
        </div>
        <div className="col-sm-6">
          <Select
            name = "Facebook Api"
            ref = "SelectApiData"
            // value = {this.state.apiType}
            // defaultValue= {this.props.options[2]}
            value={this.state.selected} 
            options = {this.props.options}
            onChange = {this.selectChange.bind(this)}
            >
          </Select>
        </div>
        </div>
      </div>
      <button 
      className="btn btn-default"
          onClick = {this.onFetchClick.bind(this)}> Fetch Data</button>
      <div className="panel panel-primary">
        <div className="panel-heading">Response</div>
        <div className = "json">
          <ReactJson src={JSON.parse(JSON.stringify(this.props.reponseFacebook))} className ="container-fluid" theme="monokai" style = "word-break: break-all;" />
        </div>
    </div>
    </div>
  )
}
}

export default connect(mapStateToProps,mapDispatchToProps)(FirstStepComponent);
// export default cssModule(FirstStepComponent, styles);
