import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';

class PhoneInfoList extends Component {
    static defaultProps = {
        data: [],
        onRemove : () => console.warn('onRemove not defined !!!'),
        onUpdate : () => console.warn('onUpdate not defined !!!'),
    }

    // 이 함수가 ture 일 경우에만 render함수를 실행시킨다.
    shouldComponentUpdate(nextProps, nextState){
        console.log(`nextProps: ${nextProps}`);
        console.log(nextProps);
        console.log(this.props);
        return nextProps.data !== this.props.data; // 다음 받아올 data와 현재 data가 다른 배열일때 true 가 된다.
    }

    render() {
        
        console.log("***** PhoneInfoList rendering *****");

        console.log(this.props);
        console.log(this.props.data);

        const { data, onRemove, onUpdate } = this.props; // this.props 는 {data:[{},{}]}의 객체이다.
        console.log(this.props.onRemove);

        /* 아래에 것 콘솔에 찍어보고 이해      
        const names = {data:[{name:'hong'}, {name:'lee'}]};
        undefined
        const {data} = names;
        undefined
        data[0];
        {name: "hong"}
        data[1];
        {name: "lee"} */
        console.log(`data[0]: ${data[0]}`);
        console.log(`data[1]: ${data[1]}`);
        console.log(`data[2]: ${data[2]}`);
        const list = data.map(info => (<PhoneInfo key={info.id} info={info} onRemove={onRemove} onUpdate={onUpdate}/>));

        return (
            <div>
                {list}
            </div>
        )
    }
}

export default PhoneInfoList;