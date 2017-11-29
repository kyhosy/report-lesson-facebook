import React from 'react';
import styles from './BaseStepComponent.css';
import Select from 'react-select';
import PropTypes from 'prop-types';
import graph from 'fb-react-sdk';
import ReactJson from 'react-json-view';
import {fetchDatasBase,requestFetchDataBase} from '../Actions/index';
import {connect} from 'react-redux';
import {isHasToken,checkNotNull} from '../Utils/Utils';
import 'react-select/dist/react-select.css';
import basestep from '../Reducers/basestep';

const mapStateToProps = (state) => {
  // console.log("state base step ..."+JSON.stringify(state));
  var a = {
      options :  [
        { value: 'comments', label: 'comments' },
        { value: 'likes', label: 'likes' },
        { value: 'photos', label: 'photos' }
      ],
      token: !isHasToken(state.authenticateFacebook.token) ? state.authenticateFacebook.token : ""  ,
      reponseFacebookFirstStep: checkNotNull(state.firststep.datas)? state.firststep.datas: {} ,
      reportData: checkNotNull(state.basestep.datas)? state.basestep.datas.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        if(!checkNotNull(a))
          return 1;
        if(!checkNotNull(b))
          return -1;
        return new Date(b.created_time) - new Date(a.created_time);
      }): [] ,
  }
  // console.log("props ..."+JSON.stringify(a));
  return a;
} 

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
  })


class BaseStepComponent extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    options: PropTypes.array,
    reponseFacebookFirstStep: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
    reportData: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    
    this.state = {selected: this.props.options[0]};
  }

  selectChange(e)
  {
    console.log(e);
    this.setState({selected:e});
  }

  onFetchClick()
  {
    // let url = this.state.url + "/"+this.state.apiType;
    var rs = this.props.reponseFacebookFirstStep;
    // console.log(rs);
    var length = rs.length;
    this.props.dispatch(requestFetchDataBase());
    for (var i = 0; i < length; i++) {
      var firstItem = rs[i];
      var objectId = firstItem.id;
  
      let url = objectId + '/' + this.state.selected.value;
      console.log(url);
      console.log(this.props);
      var com = this;
      graph.setAccessToken(this.props.token);
      graph.setVersion("2.10");
      var request = {
        url: url,
        filter: this.refs.inputData.value,
      }
      this.props.dispatch(fetchDatasBase(request));
    }
    
  }

  render = () => 
  {
    return (
    
    <div className = "FirstStepComponent">
      <h1>Base Step</h1>
      <div >
        <div className="row">
        <div className="col-sm-6">
          <a>FILTER TEXT</a>
        </div>
        <div className="col-sm-6">
          <input type = "text" className = "form-control" ref = "inputData"
              // value={this.state.selected} 
              defaultValue = "Đáp Án"
               placeholder="filter text..." 
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
          <ReactJson src={JSON.parse(JSON.stringify(this.props.reportData))} className ="container-fluid" theme="monokai" style = "word-break: break-all;" />
        </div>
    </div>
    </div>
  )
}
}
export default connect(mapStateToProps,mapDispatchToProps)(BaseStepComponent);
// export default cssModule(BaseStepComponent, styles);
