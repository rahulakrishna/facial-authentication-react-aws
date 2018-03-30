import React from 'react';
import WebCam from 'webcamjs';
import AWSUtil from './utils/aws';

class Camera extends React.Component{
    componentDidMount(){
        WebCam.set({
            width:800,
            height:400
        });
        WebCam.attach('#webcam');
        console.log(this.props.match.params.id);
    }
    validate = () =>{
        const id = this.props.match.params.id;
        WebCam.snap((data_uri) => {
            let buf = new Buffer(
                data_uri.replace(/^data:image\/\w+;base64,/, ''),'base64'
            );
            Promise.resolve(AWSUtil.compareFaces(buf,id)).then((data) => {
                if(data === false){
                  alert('Your faces don\'t match')
                }
                else{
                  window.location.href = '/page/search.html'
                }
            })
        })
    }
    render(){
        return(
            <div>
                Camera
                <div id="webcam"></div>
                <button onClick={this.validate}>Validate</button>
            </div>
        )
    }
}

export default Camera;
