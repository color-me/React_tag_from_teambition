
import React, { Component } from "react";
import "./App.css";
import {
  Input,
  Popover, 
  Button
} from "antd";


class DropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
    };
  }

  hide = () => {
    this.setState({
      visible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    return (
      <div>
      <Popover
        content={
        <div>
          <a onClick={this.hide}>关闭</a>
          <TagSearch
          
          >
          </TagSearch>

          <TagTable
          data={this.props.data}
          changeDone={this.changeDone}
          >
          </TagTable>
        </div>
        }
        title="Title"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button type="link">添加标签</Button>
      </Popover>
      </div>
      );
  }
}

class TagSearch extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Input />
      </div>
    );
  }

}

class TagTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listItems = this.props.data.map((item) =>{
      if(item.done){
        return <li className="tag-tb" 
        key={item.thing}
        onClick={this.changeDone}
        >{item.thing}</li>}});
      return (
        <ul>{listItems}</ul>
      );
  }
}

class TagList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  const listItems = this.props.data.map((item) =>{
  if(item.done){
    return <li className="tag-wrap" key={item.thing}>
    <span className="tag tag-red" >{item.thing}</span><a href="#" className="close"></a></li>}});
  return (
    <ul className="tag-ul">{listItems}</ul>
  );
  }
}

////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////

class Container extends React.Component {
    
  constructor(props) {
    super(props);
    this.state = { ////最高层级的state！！！！！！！！！！！！！！！！！！！！！！！
      editdata: null,
      data:[
        {done:true,thing:'sleep'},
        {done:true,thing:'play'},
        {done:true,thing:'drink'},
        {done:true,thing:'Eat'}
        ]
    };
  }

  componentDidMount = () => {
    this.changeDone();
  }
  changeDone = (key) => {
    this.setState({
      data:this.state.data.map((item) =>{
        if(item.thing!=key){return item}
      else {
        item.done=false;
        return item; 
      }})
     });
    // this.inteval = setTimeout(() => this.showChange(), 300);
  }

  render() {
    return (
      <div className="Container">
      <TagList
      data={this.state.data}
      />
      <DropDown
        data={this.state.data}
        changeDone={this.changeDone}
       />
       </div>
    );
  }
}




export default Container;