import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/CardList';
import SearchBox from './components/search-box/SearchBox';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: [
      ],
      searchField: '',

    };
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => {
        this.setState(() => {
          return { monsters: users }
        })
      })
  }
  onSearchChange = (event) => {
    const searchField = event.target.value;
    this.setState(() => {
      return { searchField }
    })
  }

  render() {
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase())
    })
    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox placeholder='Search Monsters' onChangeHandler={onSearchChange} className="monsters-search-box" />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}
export default App;
