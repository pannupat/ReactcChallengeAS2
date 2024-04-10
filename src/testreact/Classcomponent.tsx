import React from 'react'
class Classcomponent extends React.Component<any,any>{
    constructor(props:void){
    super(props);
    this.state = {
        count:0,
    };
    this.increase = this.increase.bind(this)
    }
    increase(){
        this.setState({count: this.state.count+1})
    }
    render(){
        return(
            <div>
            <h1>Class component</h1>
            <h2>Count: {this.state.count}</h2>
            <button onClick={this.increase}>increase</button>
            </div>
        );
    }
}
export default Classcomponent;