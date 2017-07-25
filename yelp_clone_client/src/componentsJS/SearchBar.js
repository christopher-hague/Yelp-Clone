import React from 'react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: '',
      searchLocation: ''
    }
  }

  handleTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleLocationChange(event) {
    this.setState({
      searchLocation: event.target.value
    })
  }

  submitSearch(term, location) {
    this.props.hitYelp(this.state.searchTerm, this.state.searchLocation)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.submitSearch(this.state.searchTerm, this.state.searchLocation)
  }

  render() {
    console.log(this.state, this.props)
    return (
      <div className="ui search">
        <form className="ui icon input" onSubmit={this.handleSubmit.bind(this)}>
        <input onChange={this.handleTermChange.bind(this)} type="text" className="prompt" autoComplete="off" placeholder="Enter a term" />
        <input onChange={this.handleLocationChange.bind(this)} type="text" className="prompt" autoComplete="off" placeholder="Enter search location"/>
          <input className="ui submit button" type="submit" value="Submit"></input>
          <i aria-hidden="true" className="search icon"></i>
        </form>
      </div>
    )
  }
}

export default SearchBar
