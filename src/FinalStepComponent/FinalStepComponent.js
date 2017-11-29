import React from 'react';
import styles from './FinalStepComponent.css';
import Select from 'react-select';
import PropTypes from 'prop-types';
import graph from 'fb-react-sdk';
import ReactJson from 'react-json-view';
// import {fetchDatasBase} from '../Actions/index';
import {connect} from 'react-redux';
import {isHasToken,checkNotNull} from '../Utils/Utils';
import {fetchFormatReport} from '../Actions/index'
import 'react-select/dist/react-select.css';
import ReactDOM from 'react-dom';
import { log } from 'util';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const formatItem = (message,formatText) =>
{
  var arr = formatText.split(';');


  if(arr.length > 0)
  {
    // var separators = ['qqqq', '\\\+', '-', '\\\(', '\\\)', '\\*', '/', ':', '\\\?'];
   var rx = ('(?=') + arr.join('|') +')';
   var tokens = message.split(new RegExp(rx, 'g'));
   console.log(rx);
      
    if(tokens.length > 0)
    {
      return tokens.map(function(unit){return <p>{unit}</p>});
    }
    else
    {
      return <p>{message}</p>;
    }
  }
  else
  {
    return <p>{message}</p>;
  }
}

const mapStateToProps = (state) => {
  var a = {
      token: !isHasToken(state.authenticateFacebook.token) ? state.authenticateFacebook.token : ""  ,
      formatText: checkNotNull(state.finalstep.formatText)?state.finalstep.formatText:"",
      summaryData: checkNotNull(state.basestep.datas)? state.basestep.datas.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        if(!checkNotNull(a))
          return 1;
        if(!checkNotNull(b))
          return -1;
        return new Date(b.created_time) - new Date(a.created_time);
      }).map(function(item){return {message:checkNotNull(item)?item.message:""};}): [] ,
  }

  console.log(JSON.stringify(a.summaryData));
  return a;
} 

const mapDispatchToProps = (dispatch) => ({
  dispatch: dispatch
  })

class FinalStepComponent extends React.Component {
  static propTypes = {
    token: PropTypes.string,
    summaryData: PropTypes.array.isRequired,
    formatText:PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  // constructor(props) {
  //   super(props);
    
  //   // this.state = {copyText: ""};
  //   console.log(this.state);
  // }

  state = {
    value: '',
    copied: false,
  };

  onFetchClick(e)
  {
    // this.setState({formatText:this.refs.inputData.value});
    this.props.dispatch(fetchFormatReport(this.refs.inputData.value));
  }

  onCopyClick(e)
  {
    console.log(e);
    console.log(this.refs.reportContainer);
    // this.refs.reportContainer.getDOMNode();
    var abc = ReactDOM.findDOMNode(this.refs.reportContainer);
    console.log(abc);
    var pElements = this.refs.reportContainer.querySelectorAll("p");
    console.log(pElements);
    if(pElements.length > 0)
    {
      // return tokens.map(function(unit){return <p>{unit}</p>});
      // var fullText = pElements.map(function(item){
      //   return checkNotNull(item.innerText)? item.innerText + '\n':"";
      // });
      var fullText = "";
      for(var i =0; i < pElements.length ; i ++)
      {
        fullText += checkNotNull(pElements[i].innerText)? pElements[i].innerText + '\n':"";
      }

      console.log(fullText);
      this.setState({value:fullText});
    }
  }


  render = () => {
    console.log(this.state);
    var formatText = this.props.formatText;
    const text = this.props.summaryData.map(function(item){return formatItem(item.message,formatText)});
    return (<div className = "FirstStepComponent">
            <h1>Final Step</h1>
            <div >
              <div className="row">
              <div className="col-sm-6">
                <a>Format Data</a>
              </div>
              <div className="col-sm-6">
                <input type = "text" className = "form-control" ref = "inputData"
                    defaultValue={this.props.formatText} 
                    placeholder="Format item (ex:*,**,***...)" 
                    name='name' 
                    // onChange = {this.textChange.bind(this)}
                />
              </div>
              </div>
            </div>
            <button 
            className="btn btn-default"
                onClick = {this.onFetchClick.bind(this)}> Format Report</button>
                 
          <CopyToClipboard text={this.state.value}
              onCopy={() => this.setState({copied: true})}>
              <button ref = "copyButton"
                 className="btn btn-default"
                 onClick = {this.onCopyClick.bind(this)}> Copy</button>
          </CopyToClipboard>
            <div className="panel panel-primary">
              <div className="panel-heading">Report</div>
              <div className = "json" ref = "reportContainer">
                {text}
                {/* <ReactJson src={JSON.parse(JSON.stringify(this.props.summaryData))} className ="container-fluid" theme="monokai" style = "word-break: break-all;" /> */}
              </div>
          </div>
          </div>
          )
        }
}

export default connect(mapStateToProps,mapDispatchToProps)(FinalStepComponent);
