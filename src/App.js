
import React, { Component } from "react";
import "./App.css";
import "./App.less";
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
    const listItems = this.props.data.map((item) => {
      return <li className="tag-tb"
        key={item.thing}
        onClick={this.changeDone}
      >{item.thing}
        <div style={{ visibility: item.done ? "visible" : "hidden", marginLeft: "auto", marginRight: "10px" }}>√</div>
      </li>
    });
    return (
      <ul>{listItems}</ul>
    );
  }
}

class TagList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newdata: this.props.data//这里的newdata是从父级继承过来的引用！因为对象是引用，指向的还是父组件顶级state的对象本身
    };
    this.changeDone = this.changeDone.bind(this);
  }
  changeDone(e) {
    let index = e.target.getAttribute("id");//getAttribute("key")失败了？？？？？？？？？？？？？？？？？？？？？
    this.state.newdata.map(item => {//对数据的处理要放在setState外面的地方进行，否则会出错
      if (item.thing === index) {
        item.done = false;
        return;
      }
      return item;
    })
    this.setState({
      newdata: this.state.newdata //不能在这里对数组进行处理！只能把处理好的数据传进去
    });
  }

  //把删除函数还是下放到每个子组件内，以免传递函数出问题
  render() {
    const listItems = this.state.newdata.map((item) => {
      if (item.done) {
        return <li className="tag-wrap" key={item.thing}>
          <span className="tag tag-red">
            {item.thing}
            <a href="#" className="close" id={item.thing} onClick={this.changeDone} ></a>
            </span>
            </li>
      }
    });
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
      data: [
        { done: true, thing: 'sleep' },
        { done: true, thing: 'play' },
        { done: true, thing: 'drink' },
        { done: true, thing: 'Eat' }
      ]
    };
    // this.changeDone=this.changeDone.bind(this);
  }

  // componentDidMount = () => {
  //  加载前就执行的函数
  // }


  render() {
    return (
      <div className="Container">
        <TagList
          data={this.state.data}
        // onchangeDone={this.changeDone}
        />
        <DropDown
          data={this.state.data}
          onchangeDone={this.changeDone}
        />
      </div>
    );
  }
}




export default Container;