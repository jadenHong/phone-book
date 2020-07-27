
// 라이프 사이클 보여주는 예시 https://medium.com/wasd/%EA%B8%B0%EC%B4%88%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-react-part-6-5bb4b072621a
/* import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor: 클래스의 시작");
    this.state = {
      helloLifeCycle: "helloLifeCycle"
    };
  }

  componentDidMount() {
    console.log("componentDidMount: 첫 렌더링이 완료됨");
    console.log("------------업데이트를 시작할게요 ---------------");
    console.log("setState 진행");
    this.setState({
      helloLifeCycle: "updated"
    });
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate: 컴포넌트가 업데이트 됨");
    // 업데이트 된 후의 현재 state
    console.log(this.state, "업데이트 후");
    // 업데이트 되기 전 state
    console.log(prevState, "업데이트 전");
  }

  componentWillUnmount() {
    console.log("componentWillUnMount");
    console.log("이 친구는 창 닫으면 동작해서 보실 순 없어요 ..");
  }

  render() {
    console.log("render: 나는 렌더링을 합니다.");
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
    );
  }
}
export default App; */





// props state 간단한 예시 !! 이해하기 좋음
// https://medium.com/wasd/%EA%B8%B0%EC%B4%88%EB%B6%80%ED%84%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-react-part-5-77e997cf597
// 1. State는 현재 컴포넌트 내에서 변경이 가능하다.
// 2. Props는 현재 컴포넌트 내에서 변경이 불가능하다.
// 3. Props와 State 모두 하위 컴포넌트에 상속이 가능하다.
/* import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0,
  }

  handleChange = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <div className="App">
        <h3>Index Props</h3>
        <div className="props">
          <span>{this.props.message}</span>
        </div>

        <h3>State</h3>
        <div className="state">
          {this.state.count}
        <button onClick={this.handleChange}>Click Me !!</button>
        </div>
      

      <h3>App Props</h3>
      <div className="inside-app-props">
        <InsideApp count={this.state.count} handleChange ={this.handleChange}/>
      </div>

      </div>
    )
  }
}

class InsideApp extends Component{
  render(){
    return(
      <div>
        {this.props.count}
        <button onClick={this.props.handleChange}>Click Me!!!!</button>
      </div>
    )
  }
}

export default App;
 */







import React, { Component, Fragment } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2
  state = {
    information: [
      {
        id: 0,
        name: 'youngho',
        phone: '587-222-3569',
      },
      {
        id: 1,
        name: 'HyeYeon',
        phone: '403-777-7777',
      }
    ],
    keyword:''
  }

  handleCreate = (data) => {
    console.log("handleCreate 함수 실행");
    console.log(data);

    const { information } = this.state; // const information = this.state.information 와 같은말이다.

    console.log(information);
    console.log(this.id);
    this.setState({

      information: information.concat({ id: this.id++, ...data }),// this.id++ 뒤에 ++ 이므로 this.id 를 반환하고 난 다음 ++ 가 된다. 앞에 ++this.id 를 해주면 먼저 +1 이 되고 반환이 된다.
    });
  }

  handleRemove = (id) => {
    console.log("handleRemove 함수 실행");
    const { information } = this.state;
    this.setState({
      information: information.filter(info => info.id !== id)
    });
  }

  handleUpdate = (id, data) =>{
    const {information} = this.state;
    console.log(this.state);
    console.log(id);
    this.setState({
      information: information.map(info => id === info.id ? {...info, ...data}: info),
    })
  }

  handleChange = (e) =>{
    this.setState({
      keyword: e.target.value,
    });
  };

  render() {
    console.log("App rendering"); // state 에 변화가 잇을때 마다 rendering 을 한다.

    const {information, keyword} = this.state;
    const filterList = information.filter(
      info => info.name.indexOf(keyword) !== -1
    );

    console.log(this.state);
    console.log(information);
    return (
      <Fragment>
        <PhoneForm onCreate={this.handleCreate} />
        <p>
          <input
            placeholder="검색 할 이름을 입력하세요 ~"
            onChange={this.handleChange}
            value={keyword}/>
        </p>
        <PhoneInfoList data={filterList}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate} />
      </Fragment>
    )
  }

}

export default App;













// PhoneForm.js 와 함께 사용 (input 공부)
/* import React, {Component} from 'react';
import PhoneForm from './components/PhoneForm';

class App extends Component{

  handleCreate = (data) => {
    console.log(data);
  }

  render(){
    return (
      <div>
        <PhoneForm onCreate = {this.handleCreate}/>
      </div>
    )
  }
}
export default App; */