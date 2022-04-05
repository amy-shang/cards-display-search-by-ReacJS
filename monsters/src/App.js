import React, { Component, useState , useEffect} from 'react';
import CardList from './components/cardlist/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import logo from './logo.svg';
import './App.css';

const App =() => {

  const [searchField , setSearchField] = useState('');// [value, setValue]
  console.log({searchField});
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(Response => Response.json())
    .then(users => setMonsters(users))
  },[])

  useEffect( () => {
    const newFiltermonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFiltermonsters);
    console.log('effect is firing')

  },[monsters, searchField])
  

  const handlechange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  };
  
         
  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox className='monsters-search-box' placeholder='search monsters'
        onChangeHandler={handlechange}
      />
      <CardList monsters={filteredMonsters}/>
      
    </div>
  )

}

// class App extends Component {
//   constructor(){
//     super();
//     this.state = {
//       monsters:[
//       ],
//       searchfield:''
//     }
    
//   }
//   componentDidMount(){
//     fetch('https://jsonplaceholder.typicode.com/users').then(Response => Response.json()).then(users => 
//     this.setState({monsters: users})
//     )
//   }
//   render(){
//     const {monsters, searchfield} = this.state;
//     const filtermonsters = monsters.filter(monster =>
//       monster.name.toLowerCase().includes(searchfield.toLowerCase())
//       );
//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox placeholder='search monsters'
//           handlechange = {e=>this.setState({searchfield:e.target.value})}
//         />
//         <CardList monsters={filtermonsters}/>
        
//       </div>
//     )
//   }
// }

export default App;
