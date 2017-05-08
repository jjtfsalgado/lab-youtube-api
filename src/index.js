import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail'
const API_KEY =	"AIzaSyDbnAP4IAcak1BqG7-zcWbBh3_B2Trdvy4";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      videos:[],
      term: 'surfboards',
      selectedVideo: null
    };
    this.videoSearch(this.state.term);
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div>
        <SearchBar onSearchBar={ videoSearch }/>
        <VideoDetail video={ this.state.selectedVideo }/>
        <VideoList
          onVideoSelect={ selectedVideo => this.setState({selectedVideo}) }
          videos={ this.state.videos }
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App/>
  , document.querySelector('.container'));
