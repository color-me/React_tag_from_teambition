import React, { Component } from "react";
import "./App.less";
import {
  Input,
  Popover,
  Button
} from "antd";

class ColorSelect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const colorItems = [];
    for (let i = 1; i <= 6; i++) {
      colorItems.push(
        <li key={i} colornum={i}
          id={"color-circle"}
          className={"color" + i}
          onClick={this.props.choose}>
          <span className="gougou" colornum={i}
            style={{ visibility: this.props.colornum == i ? "visible" : "hidden" }}>
            √
              </span>
        </li>
      )
    };

    return (
      <ul 
      className="tag-ul" 
      style={{ display: "flex", justifyContent: "space-between" }}>{colorItems}
      </ul>
    );
  }
}

class TagCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingItemText: '',
      colornum: 1
    };
  }

  choose = e => {
    e.stopPropagation()
    let colornum = e.target.getAttribute("colornum");
    console.log(colornum);
    this.setState({
      colornum: colornum
    })
  }

  changeItem = e => {
    e.persist();
    this.setState({ editingItemText: e.target.value }, () => {
      console.log(this.state.editingItemText);
    });
    //setState是异步的
  }

  render() {
    return (
      <div>
        <a onClick={this.props.changeToTable} className="icon">&lt;</a>
        <Input type="text" placeholder="标签名称"
          value={this.state.editingItemText}//放入需要编辑的标签的原始值
          onChange={this.changeItem}
        />
        <ColorSelect
          choose={this.choose}
          colornum={this.state.colornum}
        >
        </ColorSelect>
        <button type="primary"
          className="btn"
          style={{ width: "100%", marginBottom: "15px" }}
          onClick={this.props.handleCreate}
          value={this.state.editingItemText}
          colornum={this.state.colornum}
        >创建</button>
        {/* 这个地方不要用Antd的Button组件！！因为涉及到获取input值会需要及时的更新，而Antd的Button组件可能因为复杂的动画效果产生的延迟会影响value值的传递！ */}
      </div>
    );
  }

}

class TagEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editingItemText: this.props.itemText,
      origin: this.props.itemText,
      colornum: 1
    };
  }

  choose = e => {
    e.stopPropagation()
    let colornum = e.target.getAttribute("colornum");
    this.setState({
      colornum: colornum
    })
  }

  changeItem = e => {
    this.setState({ editingItemText: e.target.value });
    console.log(this.state.editingItemText);
  }

  render() {
    return (
      <div>
        <a onClick={this.props.changeToTable} className="icon">&lt;</a>
        <Input type="text" placeholder="标签名称"
          value={this.state.editingItemText}//放入需要编辑的标签的原始值
          onChange={this.changeItem}
        />
        <ColorSelect
          choose={this.choose}
          colornum={this.state.colornum}
        >
        </ColorSelect>
        <button className="btn btn-danger"
          id="delete"
          style={{ width: "45%", marginBottom: "15px" }}
          onClick={this.props.handleEdit}
          origin={this.state.origin}
          value={this.state.editingItemText}
        >
          删除
          </button>
        <button type="primary"
          id="change"
          className="btn"
          style={{ width: "45%", float: "right" }}
          onClick={this.props.handleEdit}
          origin={this.state.origin}
          value={this.state.editingItemText}
          colornum={this.state.colornum}
        >完成</button>
      </div>
    );
  }

}

class TagSearch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Input type="text" placeholder="搜索" 
        style={{ marginBottom: "15px", width: "80%" }}
        value={this.props.filterText}
        onChange={this.props.handleFilterTextChange}
        />
        <Button className="plus"
          onClick={this.props.changeToCreate}
        ><span className="plus-span">+</span></Button>
      </div>
    );
  }

}

class TagTable extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const filterText = this.props.filterText;
    const listItems = [];

    this.props.data.forEach((item) => {
      if (item.thing.indexOf(filterText) === -1) {//返回-1则表示没有匹配项
        return;
      }
      listItems.push(
        <li className="tag-tb"
          key={item.thing}
          id={item.thing}
          onClick={this.props.changeDone}
        >
          <span className={"tagColor" + item.color} 
          style={{ height: "0", width: "0", fontSize: "22px", marginRight: "30px" }}>• &nbsp;</span>
          {item.thing}
          <div className="edit" 
          style={{ marginLeft: "auto", zIndex: "10" }}
            id={item.thing}
            onClick={this.props.changeToEdit}
          >编辑</div> {/*点击“编辑”时，要用到阻止冒泡（stopPropagation()），以防触发changeDone事件。*/}
          <div onClick={this.props.changeDone}
            id={item.thing}
            style={{ visibility: item.done ? "visible" : "hidden", marginRight: "10px", fontWeight: "800" }}>√</div>
        </li>
      );

    });
    if (listItems.length <= 0) {
      console.log("没有")
      listItems.push(
        <li className="tag-tb" key style={{ color: "#a9a9a9" }}> 没有结果 </li>
      )
    }
    return (
      <ul>{listItems}</ul>
    );
  }
}

class DropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      visible: false
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

  handleFilterTextChange = e => {
    let filterText = e.target.value;
    this.setState({
      filterText: filterText
    });
  }

  render() {
    if (this.props.view == 1) {
      return (
        <Popover
          content={
            <div style={{ width: "250px" }}>
              <TagSearch
                filterText={this.state.filterText}
                handleFilterTextChange={this.handleFilterTextChange}
                changeToCreate={this.props.changeToCreate}
              >
              </TagSearch>

              <TagTable
                filterText={this.state.filterText}
                data={this.props.data}
                changeDone={this.props.changeDone}
                changeToEdit={this.props.changeToEdit}
              >
              </TagTable>
            </div>
          }
          title="所有标签"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="link">添加标签</Button>
        </Popover>
      );
    } else if (this.props.view == 2) {
      return (
        <Popover
          content={
            <div style={{ width: "250px" }}>
              <a onClick={this.hide} className="icon" 
              style={{ float: "right", marginRight: "7px", marginLeft: "30px" }}>×</a>
              <TagCreate
                changeToTable={this.props.changeToTable}
                handleCreate={this.props.handleCreate}
              >
              </TagCreate>
            </div>
          }
          title="新增标签"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="link">添加标签</Button>
        </Popover>
      );
    } else if (this.props.view == 3) {
      return (
        <Popover
          content={
            <div style={{ width: "250px" }}>
              <a onClick={this.hide} className="icon" 
              style={{ float: "right", marginRight: "7px", marginLeft: "30px" }}>×</a>
              <TagEdit
                changeToTable={this.props.changeToTable}
                handleEdit={this.props.handleEdit}
                itemText={this.props.itemText}
              >
              </TagEdit>
            </div>
          }
          title="修改标签"
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <Button type="link">添加标签</Button>
        </Popover>
      );
    }
  }
}

export default DropDown;