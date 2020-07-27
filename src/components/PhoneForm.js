import React, {Component} from 'react';

// 이 클래스는 처음 실행될때 input 두개, button 한개 생성함
class PhoneForm extends Component{
    state = {
        name:'',
        phone:'',
    }
    handleChange = (e) => {

        console.log("handleChange 함수 실행");

        this.setState({
            [e.target.id]:e.target.value,/* Computed property names( [] ) 라는 문법이다.
                                            표현식(expression)을 이용해 객체의 key 값을 정의하는 문법이다.
                                            아래에 input 에 id 를 통해 구분지을 수 있다.
                                            여기 참고 하면 됨 https://poiemaweb.com/es6-enhanced-object-property */
        });
        console.log(e.target.id);
    }

    handleSubmit = (e) => {
        console.log("********** handleSubmit 함수 실행 ********");
        e.preventDefault(); //페이지 리로딩 방지
        
        // 상태값을 onCreate 를 통해서 부모에게(App) 전달
        console.log(this.state);
        this.props.onCreate(this.state);

        //상태 초기화
        this.setState({
            name:'',
            phone:'',
        });
    }
    render(){
        console.log("PhoneForm rendering");
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="이름"
                value={this.state.name}
                onChange={this.handleChange}
                id="name"/>{/* id 대신 name 같은 거 써도 각 input 을 구분할 수 잇음 */}

                <input placeholder="전화번호"
                value={this.state.phone}
                onChange={this.handleChange}
                id="phone"/>{/* id 대신 name 같은 거 써도 각 input 을 구분할 수 잇음 */}
                <div>{this.state.name} {this.state.phone}</div>
                <button type="submit">등록</button>
            </form>
            
        )
    }
}
export default PhoneForm;