import React,{PureComponent} from "react";
function addAge(Target: Function){
    Target.prototype.age = 18
}

@addAge
export default class ClassComponent extends PureComponent{
    age?: number
    render(){
        return (
            <div>我是类组件，我的age是{this.age}</div>
        )
    }
}
