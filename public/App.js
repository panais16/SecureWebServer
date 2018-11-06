import React from 'react';
import {
    render,
} from 'react-dom';
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', password: ''};
    }
    queryUserInfo(){
        var name = document.getElementById('name').value;
        var password = document.getElementById('password').value;
        fetch('/queryByName/'+name+"/"+password,{
                method:'GET',
                headers:{
                    'Content-Type':'application/json;charset=UTF-8'
                },
            })
            .then(res =>res.json())
            .then((data) => {
               console.log(data);
               if(data.length>0){
                   render(<h1>login success</h1>, document.getElementById('root'));
               }else{
                   alert("no account");
               }
            });
    }
    saveUserInfo(){
        var name = document.getElementById('name').value;
        var password = document.getElementById('password').value;
        console.log(name,password);
        fetch('/add',{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name: name,
                password: password,
            })
        })
        .then(res =>res.json())
        .then((data) => {
            if(data.message=='success'){
                render(<h1>register success</h1>, document.getElementById('root'));
            }

        });
    }
  render() {
    return (
      <div className="container">
          <div className="row width">
              <label className="form-group">Username:</label>
              <input className="form-control" type="text" id="name" placeholder="Username" />
          </div>
          <div className="row width">
            <label className="form-group">Password:</label>
            <input type="text" className="form-control" id="password" placeholder="Password"/>
          </div>
          <div className="height"></div>
          <div className="row width">
              <button onClick={this.queryUserInfo}  className="btn btn-primary">submit</button>
              <div className="col-md-8"></div>
              <button onClick={this.saveUserInfo}  className="btn btn-primary">register</button>
          </div>

      </div>
    );
  }
}

export default App;
