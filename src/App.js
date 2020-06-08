
import React, { Component } from "react";
import DropDown from "./tools.js"
import "./App.less";
import {
  Input,
  Popover,
  Button
} from "antd";


class TagList extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   newdata: this.props.data
    // };
    // this.changeDone = this.changeDone.bind(this);
  }
  // changeDone(e) {
  //   let index = e.target.getAttribute("id");
  //   this.state.newdata.map(item => {
  //     if (item.thing === index) {
  //       item.done = false;
  //       return;
  //     }
  //     return item;
  //   })
  // }

  // componentWillMount() {//在这里设置钩子函数和定时器是为了解决刚进入App时点击TagTable里的数据列表修改标签状态但无法同时反映在TagList上的bug
  //   setInterval(() => {//(如果先操作TagList再操作TagTable就没有问题，可能是两个子组件间不成附属关系，继承自父组件的引用值刷新不能同时相互关联，先操作TagList后TagTable没问题可能因为DropDown组件的显隐,事先触发了setState)
  //     this.setState({
  //       newdata: this.state.newdata
  //     });
  //   }, 200);
  // }
  //把删除函数还是下放到每个子组件内，以免传递函数出问题
  render() {
    const listItems = this.props.data.map((item) => {
      if (item.done) {
        return <li className="tag-wrap" key={item.thing}>
          <span className="tag tag-red">
            {item.thing}
            <a href="#" className="close" id={item.thing} onClick={this.props.changeDone} ></a>
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

class Container extends Component {

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
  }

  // componentDidMount = () => {
  //  加载前就执行的函数
  // }
  changeDone=(e)=> {//
    let index = e.target.getAttribute("id");
    console.log("666666")
    this.state.data.map(item => {
      if (item.thing === index) {
        item.done = !item.done;
        return;
      }
      return item;
    })
    this.setState({
      data: this.state.data
    })
  }

  handleEdit = e => {
    console.log("edit (delete and change) 判断是编辑完成还是删除按钮 执行两种操作");
  }

  handleCreate = e => {
    console.log("create");
  }

  render() {
    return (
      <div className="Container">
        <TagList
          changeDone={this.changeDone}
          data={this.state.data}
        />
        <DropDown
          changeDone={this.changeDone}
          handleEdit={this.handleEdit}
          handleCreate={this.handleCreate}
          data={this.state.data}
        />
      </div>
    );
  }
}


export default Container;