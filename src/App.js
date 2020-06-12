import React, { Component } from "react";
import DropDown from "./tools.js"
import "./App.less";


class TagList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const listItems = this.props.data.map((item) => {
      if (item.done) {
        return <li className="tag-wrap" key={item.thing}>
          <span id="tag" className={"tagColor" + item.color}>
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

class Container extends Component {

  constructor(props) {
    super(props);
    this.state = { ////最高层级的state！！！
      editdata: null,
      data: [
        { done: true, thing: 'sleep', color: '1' },
        { done: false, thing: 'play', color: '2' },
        { done: true, thing: 'drink', color: '3' },
        { done: true, thing: 'eat', color: '4' },
        { done: true, thing: 'swim', color: '5' },
        { done: true, thing: 'run', color: '6' },
      ],
      view: 1,
      itemText: ''
    };
  }

  //标签列表在浏览器本地存储，为了展示效果暂时注释掉
  // componentDidMount () {//  加载前就执行的函数
  //   this.setState(() => ({
  //       data: JSON.parse(localStorage.getItem('data')) || []
  //   }))
  // }
  // componentDidUpdate() {
  //   localStorage.setItem('data', JSON.stringify(this.state.data));
  // }

  changeToTable = e => {
    this.setState({
      view: 1,
    });
  }

  changeToEdit = e => {
    e.stopPropagation();//点击编辑，阻止事件冒泡！
    console.log("666");
    let itemText = e.target.getAttribute("id");
    this.setState({
      itemText: itemText,
      view: 3
    });
  }

  changeToCreate = e => {
    console.log("222");
    this.setState({
      view: 2,
    });
  }

  changeDone = (e) => {
    e.stopPropagation();
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

  handleCreate = e => {
    e.persist();
    let a = {};
    let flag = true;
    a.done = true;
    a.thing = e.target.value;
    a.color = e.target.getAttribute("colornum");
    console.log(a.thing);
    if (a.thing.length == 0) {
      flag = !flag;
    }
    this.state.data.forEach(item => {
      if (item.thing === a.thing) {
        flag = !flag;
      }
    })
    if (flag) {
      this.state.data.push(a);
      this.setState({
        data: this.state.data,
        view: 1
      })
    } else if (a.thing.length == 0) {
      alert("不能为空 ！");
    }
    else {
      alert("标签名称已存在！");
    }
  }

  handleEdit = e => {
    // edit (delete and change) 判断是编辑完成还是删除按钮 执行两种操作
    e.persist();
    var origin = e.target.getAttribute("origin");//谁调用handleEdit函数，谁就通过e.target来获取它自己身上的origin
    let which = e.target.getAttribute("id");
    if (which == "change") {
      let a = {};
      let flag = true;
      let appearAgain = false;
      a.done = true;
      a.thing = e.target.value;
      a.color = e.target.getAttribute("colornum");
      console.log(a.thing);
      if (a.thing.length === 0) {
        flag = false;
      }
      this.state.data.forEach(item => {
        if (item.thing === a.thing && a.thing !== origin) {
          flag = false;
          appearAgain = true;
        };
      })
      console.log(flag);
      if (appearAgain != true) {
        this.state.data.forEach(item => {
          if (item.thing === origin && a.thing.length != 0) {
            item.thing = a.thing;
            item.color = a.color;
          };
        })
      }
      if (flag) {
        this.setState({
          data: this.state.data,
          view: 1
        })
      } else if (a.thing.length == 0) {
        alert("不能为空 ！");
      }
      else if (appearAgain) {
        alert("标签名称已存在！");
      } else {
        this.setState({
          view: 1
        })
      }
    } else if (which == "delete") {
      var index;
      console.log(origin + "-666");
      this.state.data.forEach(item => {
        console.log(item.thing);
        if (item.thing === origin) {
          index = this.state.data.indexOf(item);
          console.log("OK");
        }
      })
      this.state.data.splice(index, 1);
      this.setState({
        data: this.state.data,
        view: 1
      })
    }

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
          changeToTable={this.changeToTable}
          changeToEdit={this.changeToEdit}
          changeToCreate={this.changeToCreate}
          view={this.state.view}
          data={this.state.data}
          itemText={this.state.itemText}
        />
      </div>
    );
  }
}

export default Container;