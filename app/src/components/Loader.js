import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class Loader extends React.Component{
	constructor(props){
		super(props);
		this.size = (this.props.size ? this.props.size: '20') + 'px'
	}
	render(){
		return(
			<CircularProgress  color={"#a7cb00"} size={this.size}/>
		);
	}
} 

export default Loader;