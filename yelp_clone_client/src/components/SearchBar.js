import React from 'react'

class SearchBar extends React.Component {
  
  constructor(props) {
    super(props)

    this.state = {
      locationInput: localStorage.locationInput || 'flatiron school',
      termInput: localStorage.termInput || 'food'
    }
  }

  handleLocationChange(event) {
    this.setState({
      locationInput: event.target.value
    })
  }

  handleTermChange(event) {
    this.setState({
      termInput: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.handleSubmit()
    this.setState({
      locationInput: "",
      termInput: ""
    })
  }

  render() {
    return (
      <div>
        <div className="ui search">
          <form className="ui icon input" onSubmit={this.handleSubmit.bind(this)}>
            <input onChange={this.props.handleLocationChange} type="text" className="prompt" autoComplete="off" placeholder="Enter a location" />
            <input onChange={this.props.handleTermChange} type="text" className="prompt" autoComplete="off" placeholder="Enter search term"/>
            <input className="ui submit button" type="submit" value="Submit" />
            <i aria-hidden="true" className="search icon"></i>
          </form>
        </div>
      </div>
    )
  }
}

export default SearchBar
