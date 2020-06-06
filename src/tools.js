import React, { Component } from "react";
import "./App.less";
import {
  Input,
  Popover,
  Button
} from "antd";

  class TagInput extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <Input placeholder="输入标签名" style={{ marginBottom: "15px" }} />
        </div>
      );
    }
  
  }

  class ColorSelect extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <Input placeholder="搜索" style={{ marginBottom: "15px" }} />
        </div>
      );
    }
  
  }

  class TagCreate extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <Input placeholder="搜索" style={{ marginBottom: "15px" }} />
        </div>
      );
    }
  
  }

  class TagEdit extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      return (
        <div>
          <Input placeholder="搜索" style={{ marginBottom: "15px" }} />
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
          <Input type="text" placeholder="搜索" style={{ marginBottom: "15px",width:"80%" }} 
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
      // this.state = {
      //   newdata: this.props.data//这里的newdata是从父级继承过来的引用！因为对象是引用，指向的还是父组件顶级state的对象本身
      // };
      // this.changeDone = this.changeDone.bind(this);
    }
  
    // changeDone(e) {
    //   let index = e.target.getAttribute("id");//getAttribute("key")失败了？？？？？？？？？？？？？？？？？？？？？
    //   this.state.newdata.map(item => {//对数据的处理要放在setState外面的地方进行，否则会出错
    //     if (item.thing === index) {
    //       item.done = !item.done;
    //       return;
    //     }
    //     return item;
    //   })
    //   this.setState({
    //     newdata: this.state.newdata //不能在这里对数组进行处理！只能把处理好的数据传进去
    //   });
    // }
  
    render() {
      // const listItems = this.props.data.map((item) => {
      //   return <li className="tag-tb"
      //     key={item.thing}
      //     id={item.thing}
      //     onClick={this.changeDone}                                           //点击“编辑”时，要用到阻止冒泡（stopPropagation()），以防触发changeDone事件。
      //   >{item.thing}
      //   <div className="edit" style={{ marginLeft: "auto",zIndex:"10" }}>编辑</div> 
      //   <div style={{ visibility: item.done ? "visible" : "hidden", marginRight: "10px",fontWeight: "800" }}>√</div>
      //   </li>
      // });

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
          >{item.thing}
          <div className="edit" style={{ marginLeft: "auto",zIndex:"10" }}
          onClick={this.props.changeToEdit}
          >编辑</div> {/*点击“编辑”时，要用到阻止冒泡（stopPropagation()），以防触发changeDone事件。*/}
          <div style={{ visibility: item.done ? "visible" : "hidden", marginRight: "10px",fontWeight: "800" }}>√</div>
        </li>
      );
      if (listItems.length<1){// 二选一！！！！！！！！！！
        // listItems.push(
        //   <li className="tag-tb"> 没有结果 </li>
        // )

        this.props.changeToEdit();
      }
      });

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
        visible: false,
      };
    }
  
    // hide = () => {
    //   this.setState({
    //     visible: false,
    //   });
    // };
    changeToEdit = e => {
      e.stopPropagation();//点击编辑，阻止事件冒泡！！！！！！！！
      console.log("666");
    }

    changeToCreate = e => {
      console.log("222");
    }
  
    handleVisibleChange = visible => {
      this.setState({ visible });
    };

    handleFilterTextChange = e => {
      let filterText=e.target.value;
      this.setState({
        filterText: filterText
      });
    }
    
    render() {
      return (
        <div>
          <Popover
            content={
              <div style={{ width: "250px" }}>
                {/* <a onClick={this.hide} style={{display:"block",float:"right",marginRight:"7px",marginBottom:"10px"}}>关闭</a> */}
              
                  {/* 在这里用if else 切换三种视图！！！！！！！！！！！！！！！！！！！！！！！！ */}

                  <div style={{display:"block"}}>
                    <TagSearch
                    filterText={this.state.filterText}
                    handleFilterTextChange={this.handleFilterTextChange}
                    changeToCreate={this.changeToCreate}
                                                //标签状态框!!!!!!!!!!!!!!!!!!!!!!!
                    >
                    </TagSearch>
  
                    <TagTable
                      filterText={this.state.filterText}
                      data={this.props.data}
                      /////////////////////////////////////////////////////////////////
                      changeDone={this.props.changeDone}//这里是问题所在！！！，爷爷组件的方法传不进去！！！！！！！！！！！！
                      /////////////////////////////////////////////////////////////////
                      changeToEdit={this.changeToEdit}
                    >
                    </TagTable>
                  </div>
  
                  <div style={{display:"none"}}>
                    <TagInput
                                                //标签新增框!!!!!!!!!!!!!!!!!!!!!!!
                    >
                    </TagInput>
  
                    <ColorSelect
                    
                    >
                    </ColorSelect>
  
                    <TagCreate
                    >
  
                    </TagCreate>
                  </div>
  
                  <div style={{display:"none"}}>
                    <TagInput
                                                //标签修改框!!!!!!!!!!!!!!!!!!!!!!!
                    >
                    </TagInput>
  
                    <ColorSelect

                    >
                    </ColorSelect>
  
                    <TagEdit
                    >
  
                    </TagEdit>
                  </div>
              </div>
            }
            title="所有标签"
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

  export default DropDown;