import React, { Component } from 'react';

// 이 클래스는 밑에 전화번호부를 보여주는 것을 PhoneInfoList 로 넘겨서 화면에 나타내준다. 결국 마지막에는 PhoneInfoList를 거쳐 최종 부모인 App component에서랜더링 되면서 화면에 나타내준다.
class PhoneInfo extends Component {
    static defaultProps = {
        info: {
            name: '이름',
            phone: '010-0000-0000',
            id: 0,
        }
    }
    state = {
        editing: false,
        name: '',
        phone: '',
    }
    handleRemove = () => {
        console.log("**** 전화번호부 삭제 시작 ****");
        console.log(this.props);
        console.log("PhoneInfoList 에서 this.props 값인 info와 onRemove 를 전달 받는다.");
        const { info, onRemove } = this.props;
        console.log("onRemove props에 id값전달");
        //onRemove에 인자값으로 info.id 를 전달한다. 그럼 App component에서 props인 onRemove가 이걸 받아서 handleRemove를 실행한다.
        onRemove(info.id);
    }

    // editing 값을 반전시키는 함수입니다
    // true -> false, false -> true
    handleToggleEdit = () => {
        console.log('***************************************');
        console.log('수정,적용 버튼을 눌러서 handleToggleEdit 함수 실행 ');
        console.log(this.state);

        const { editing } = this.state;

        console.log(editing);

        //editing: true, 로 바뀐다.(!editing)이라고 해줫으므로
        this.setState({
            editing: !editing,
        });
    }
    // input 에서 onChange 이벤트가 발생 될 때
    // 호출되는 함수입니다
    handleChange = (e) => {
        const { name, value } = e.target;
        
        console.log(name);
        console.log(value);

        this.setState({
            [name]: value,
        })
    }
// 여기서는, editing 값이 바뀔 때 처리 할 로직이 적혀있습니다.
    // 수정을 눌렀을땐, 기존의 값이 input에 나타나고,
    // 수정을 적용할땐, input 의 값들을 부모한테 전달해줍니다.
    // render() 가 불리고 난다음 실행되는 함수이다. (즉 화면이 업데이트 되고 실행이된다.).
    componentDidUpdate(prevProps, prevState){

        console.log('render() 호출되고 화면 업데이트 되고 componentDidUpdate 함수 실행!!!');
        console.log(prevState.editing);

        const {info, onUpdate} = this.props;

        console.log(this.props);

        // editing 값이 false -> true 로 전환 될 때
      // info 의 값을 state 에 넣어준다
        if(!prevState.editing  && this.state.editing){
            console.log('editing 값이 false -> true 로 전환');
            this.setState({
                name:info.name,
                phone:info.phone,
            })
        }
// editing 값이 true -> false 로 전환 될 때
        if(prevState.editing && !this.state.editing){
            console.log('editing 값이 true -> false 로 전환');
            console.log(`name: ${this.state.name} phone: ${this.state.phone}`);
            onUpdate(info.id, {name:this.state.name, phone:this.state.phone});
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        // 수정 상태가 아니고, info 값이 같다면 리렌더링 안함
        if(!this.state.editing && !nextState.editing && nextProps.info === this.props.info){
            return false;
        }
        // 나머지 경우엔 리렌더링함
        return true;
    }

    render() {

        console.log("PhoneInfo rendering"+this.props.info.id);

        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px',
        };

        // console.log(this.props.info);
        // const { name, phone, id } = this.props.info;

        const {editing} = this.state;
        console.log(this.state);
        console.log(editing);

        if(editing){
            console.log('editing 이 true 일 경우 실행 , 수정버튼을 눌렀을 때 실행');
            console.log(this.state.name);
        return (
            
            <div style={style}>
                <div>
                    <input 
                        value={this.state.name}
                        name="name"
                        placeholder="이름"
                        onChange={this.handleChange}/>
                </div>
                <div>
                    <input
                        value={this.state.phone}
                        name="phone"
                        placeholder="전화번호"
                        onChange={this.handleChange}/>
                </div>
                <button onClick={this.handleToggleEdit}>적용</button>
                <button onClick={this.handleRemove}>삭제</button>
            </div>  
            );
            }else{
                console.log(`editing == false 일 경우 실행(default 값이다.)`);
                console.log(this.props.info);
                const{name, phone} = this.props.info;
                return (
                    <div style={style}>
                        <div><b>{name}</b></div>
                        <div>{phone}</div>
                        <button onClick={this.handleToggleEdit}>수정</button>
                        <button onClick={this.handleRemove}>삭제</button>
                    </div>
                );
            }
    }
}
export default PhoneInfo;


/* 배열내의 객체 값 수정하는 법
const array = [
    { id: 0, text: 'hello', tag: 'a' },
    { id: 1, text: 'world' , tag: 'b' },
    { id: 2, text: 'bye', tag: 'c' }
  ];

  const modifiedArray = array.map(item => item.id ===1 ? {...item, text:'Korea'} : item);
   */