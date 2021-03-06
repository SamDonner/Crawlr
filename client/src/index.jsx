/*                    index
search    map      crawlentrylist       searchlist
                    crawlentry          searchitem

index has handleSearch -> passed to search
      has handlesearchitemADDclick -> passed to searchlist, then searchitem
      has handlemapmarkerADDclick -> passed to map
        has state that on marker/searchitem click, changes which tells crawlentry to add new item

search has handleinput change

map has api stuffz

searchlist passes handlesearchitemclick to searchitem

crawlentry is generated when info from index state changes by click from searchitem or map
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Search from './Search.jsx';
import MapView from './MapView.jsx';
import CrawlEntryList from './CrawlEntryList.jsx';
import SearchList from './SearchList.jsx';
import MapContainer from './MapContainer.jsx'
import $ from 'jquery';

// let intialBars =

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      barAdded: [],
      searchValue: '',
      barList: [],
      location: {lat: 30.2672, lng: -97.7431}
    }
    this.handleSearch = this.handleSearch.bind(this);
    this.handleBarAdd = this.handleBarAdd.bind(this);
  }

  handleSearch (searchText) {
    console.log('hit handlesearch in index.jsx, searchtext is:', searchText);
    //set searchvalue state to search
    this.setState({searchValue: searchText});
    //do post request to server with search value
    let location = {location: searchText}
    $.post('/Search', location, (data) => {

      this.setState({
        barList: data.barList,
        location: data.coor
      });
    });
  }
  handleSearchItemAdd() {}
  handleBarAdd(bar) {
    console.log('good job u clicked it')
    var newBarList = this.state.barAdded;
    newBarList.push(bar);
    this.setState({
      barAdded: newBarList
    })
  }

  render() {
    return (
      <div>
        <h1>Crawlr: A Pub Crawl Creator</h1>
        <h2>First, enter your city of choice!</h2>
        <div>
          <Search onSubmit={this.handleSearch}/>
        </div>
        <div>
          <MapContainer addbar={this.handleBarAdd} barlist={this.state.barList} location={this.state.location} />
        </div>
        <div>
        </div>
        <div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));