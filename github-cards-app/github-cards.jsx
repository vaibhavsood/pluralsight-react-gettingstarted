/*
My code: https://jscomplete.com/playground/s501618
Their code: https://jscomplete.com/playground/rgs2.7
*/

const testData = [
			{name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
      {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
  		{name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
    {name: "Vaibhav Sood", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Microsoft"},  
];

class CardList extends React.Component {
  render() {
    return(
      <div>
        {this.props.profiles.map(user => <Card {...user}/>)}
      </div>
    );
  }
}

class Card extends React.Component {
    render() {
      return (
        <div className="card">
          <img className="photo" src={this.props.avatar_url}/>
          <h4>{this.props.name}</h4>
          <h4>{this.props.company}</h4>
        </div>  
      );
    }
}

class Form extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        profileName: '',
      };
    } 
    handleSubmit = async (event) => {
      event.preventDefault();
      const resp = await axios.get(`https://api.github.com/users/${this.state.profileName}`);
      this.props.onSubmit(resp.data);
      this.setState({profileName:''});
    }
    handleChange = (event) => {
      this.setState({profileName: event.target.value});
    }
    render() {
      return (
        <form className="form" onSubmit={this.handleSubmit}>
          <input type="text" 
                 placeholder="Github handle"
                 value={this.state.profileName}
                 onChange={this.handleChange}/>
          <button>Add Profile</button>
        </form>
      );
    }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
    }
  }
  
  onSubmit = (profileData) => {
    this.setState(prevState => ({
      profiles: [...prevState.profiles, profileData],
    }));
  }
  
  render() {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.onSubmit}/>
        <CardList profiles={this.state.profiles}/>
      </div>
    )
  }
}

ReactDOM.render(
  <App title="The GitHub Profiles Project"/>,
  mountNode,
);
