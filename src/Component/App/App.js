import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

import Spotify from '../../util/Spotify';


class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults: [{
        name: "HIGHEST IN THE ROOM",
        artist: "Ershad Nouri",
        album:  "Remember",
        id: 1,     
      },
      {
        name: "I AM YOUR BRO",
        artist: "Milad Nouri",
        album:  "Wow Pow",
        id: 2,     
      }],
      playListName: "My Playlist",
      playlistTracks: [{
        name: "PlaylistName1",
        artist: "PlaylistArtist1",
        album:  "PlaylistAlbum1",
        id: 4,     
      },
      {
        name: "PlaylistName2",
        artist: "PlaylistArtist2",
        album:  "PlaylistAlbum2",
        id: 5,     
      },
      {
        name: "PlaylistName3",
        artist: "PlaylistArtist3",
        album:  "PlaylistAlbum3",
        id: 3,     
      }]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track){
    const tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter((myTrack) => {
      return myTrack.id !== track.id;
    });
    console.log(tracks);
    this.setState({playlistTracks: tracks});
  }

  updatePlaylistName(name){
    this.setState({playListName: name});
  }

  savePlaylist(){
    console.log("Hello");
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playListName, trackURIs).then(() => {
      this.setState({
        playListName: "New Playlist",
        playlistTracks: [],
      });
    }).catch(error => {
      console.log(error);
    });
  }

  search(searchTerm){
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playListName={this.state.playListName} 
                playlistTracks={this.state.playlistTracks} 
                onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
