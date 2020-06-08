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
      this.state = {
        selectedColor: ''
      };
    }

    choose = e => {
      e.stopPropagation()
      let selectedColor = e.target.getAttribute("colornum");
      this.setState({
        selectedColor: selectedColor
      })
    }
  
    render() {
      const colorItems=[];
      for(let i=1;i<=6;i++){
        colorItems.push(
          <li key={i} colornum={i}
          id={"color-circle"} 
          className={"color"+i} 
          onClick={this.choose}>
              <span className="gougou" colornum={i}
              style={{visibility: this.state.selectedColor==i ? "visible" : "hidden"}}>
                √
              </span>
          </li>
        )
      };
    
      return (
           <ul className="tag-ul" style={{display:"flex",justifyContent: "space-between"}}>{colorItems}</ul>
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
          <a onClick={this.props.changeToTable} className="icon">&lt;</a>
          <Input type="text" placeholder="标签名称"
            value={this.props.filterText}
          />
          <ColorSelect
          >
          </ColorSelect>
          <Button type="primary"
          style={{width:"100%",marginBottom:"15px"}}
          // onClick={this.props.changeToCreate}
          >创建</Button>
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
          <a onClick={this.props.changeToTable} className="icon">&lt;</a>
          <Input type="text" placeholder="标签名称"
            value={this.props.filterText}//放入需要编辑的标签的原始值
          />
          <ColorSelect
          >
          </ColorSelect>
          <Button danger style={{width:"45%",marginBottom:"15px"}}>
            删除
          </Button>
          <Button type="primary"
           style={{width:"45%",float:"right"}}
          // onClick={this.props.changeToCreate}
          >完成</Button>
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
          >
            <span className="dot">• &nbsp;</span>
            {item.thing}
          <div className="edit" style={{ marginLeft: "auto",zIndex:"10" }}
          onClick={this.props.changeToEdit}
          >编辑</div> {/*点击“编辑”时，要用到阻止冒泡（stopPropagation()），以防触发changeDone事件。*/}
          <div style={{ visibility: item.done ? "visible" : "hidden", marginRight: "10px",fontWeight: "800" }}>√</div>
        </li>
      );

      });
      if (listItems.length<=0){// 二选一！！！！！！！！！！
        console.log("没有")
        listItems.push(
          <li className="tag-tb" key style={{color:"#a9a9a9"}}> 没有结果 </li>
        )
        // this.props.changeToEdit();
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
        visible: false,
        view:1
      };
    }
  
    // hide = () => {
    //   this.setState({
    //     visible: false,
    //   });
    // };

    changeToTable= e => {
      this.setState({
        view: 1,
      });
    }

    changeToEdit = e => {
      e.stopPropagation();//点击编辑，阻止事件冒泡！！！！！！！！
      console.log("666");
      this.setState({
        view: 3,
      });
    }

    changeToCreate = e => {
      console.log("222");
      this.setState({
        view: 2,
      });
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
                {/* <a onClick={this.hide} className="icon" style={{float:"right",marginRight:"7px",marginLeft:"30px"}}>×</a> */}
              
                  {/* 在这里用if else 切换三种视图！！！！！！！！！！！！！！！！！！！！！！！！ */}

                  <div style={{display:this.state.view==1?"block":"none"}}>
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
  
                  <div style={{display:this.state.view==2?"block":"none"}}>
                                                {/* //标签新增框!!!!!!!!!!!!!!!!!!!!!!! */}
                    <TagCreate
                    changeToTable={this.changeToTable}
                    >
  
                    </TagCreate>
                  </div>
  
                  <div style={{display:this.state.view==3?"block":"none"}}>
                                                {/* //标签修改框!!!!!!!!!!!!!!!!!!!!!!! */}
                    <TagEdit
                    changeToTable={this.changeToTable}
                    >
  
                    </TagEdit>
                  </div>
              </div>
            }
            title="标签编辑器"
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