import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordManager from './component/PasswordManager'
import './App.css'

const colorList = ['yellow', 'green', 'orange', 'brown', 'blue']

class App extends Component {
  state = {
    passwordsList: [],
    isCheckboxClicked: false,
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    searchInput: '',
  }

  onChangeWebsiteInput = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsernameInput = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({passwordInput: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const color = colorList[Math.floor(Math.random() * 5)]
    const initial = websiteInput.slice(0, 1).toUpperCase()
    const newPassword = {
      id: uuidv4(),
      initialValue: initial,
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
      colorValue: color,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onClickCheckbox = event => {
    if (event.target.checked) {
      this.setState({isCheckboxClicked: true})
    } else {
      this.setState({isCheckboxClicked: false})
    }
  }

  onDeleteId = id => {
    const {passwordsList} = this.state
    const filteredList = passwordsList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordsList: filteredList})
  }

  render() {
    const {
      passwordsList,
      websiteInput,
      usernameInput,
      passwordInput,
      isCheckboxClicked,
      searchInput,
    } = this.state

    const searchResults = passwordsList.filter(eachResult =>
      eachResult.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const noPasswords = searchResults.length > 0
    const passwordsCount = searchResults.length

    return (
      <div className="app-container">
        <div className="card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
          <div className="add-password-container">
            <img
              className="password-sm-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
            />
            <img
              className="password-lg-img"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
            <form className="form-container" onSubmit={this.onAddPassword}>
              <h1 className="form-title">Add new Password</h1>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </div>
                <input
                  value={websiteInput}
                  type="text"
                  className="input-text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsiteInput}
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </div>
                <input
                  value={usernameInput}
                  type="text"
                  className="input-text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsernameInput}
                />
              </div>
              <div className="input-container">
                <div className="icon-container">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </div>
                <input
                  value={passwordInput}
                  type="password"
                  className="input-text"
                  placeholder="Enter Password"
                  onChange={this.onChangePasswordInput}
                />
              </div>
              <div className="button-container">
                <button className="add-button" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div className="display-container">
            <div className="top-display-container">
              <div className="passwords-count-container">
                <h1 className="name">Your Passwords</h1>
                <div className="count-container">
                  <p className="count">{passwordsCount}</p>
                </div>
              </div>
              <div className="input-search-container">
                <div className="search-icon-container">
                  <img
                    className="icon"
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                    alt="search"
                  />
                </div>
                <input
                  type="search"
                  className="input-search"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="separator" />
            <div className="checkbox-container">
              <input
                id="check"
                className="checkbox"
                type="checkbox"
                onChange={this.onClickCheckbox}
              />
              <label htmlFor="check" className="show-password">
                Show Passwords
              </label>
            </div>
            {!noPasswords && (
              <div className="no-passwords-image-container">
                <img
                  className="no-passwords-image"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                />
                <p className="description">No Passwords</p>
              </div>
            )}
            {noPasswords && (
              <div>
                <ul className="password-items-container">
                  {searchResults.map(eachPasswordItem => (
                    <PasswordManager
                      key={eachPasswordItem.id}
                      passwordItemDetails={eachPasswordItem}
                      deletePasswordItem={this.onDeleteId}
                      isPasswordVisible={isCheckboxClicked}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
