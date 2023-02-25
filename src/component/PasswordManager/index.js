import './index.css'

const PasswordManager = props => {
  const {passwordItemDetails, deletePasswordItem, isPasswordVisible} = props
  const {
    id,
    initialValue,
    website,
    username,
    password,
    colorValue,
  } = passwordItemDetails

  const onClickDeleteIcon = () => {
    deletePasswordItem(id)
  }

  return (
    <li className="list-item">
      <div className="password-display">
        <div className={`initial-container ${colorValue}`}>
          <h1 className="initial-heading">{initialValue}</h1>
        </div>
        <div className="password-details">
          <p className="password">{website}</p>
          <p className="password">{username}</p>
          {!isPasswordVisible && (
            <img
              className="stars"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
          {isPasswordVisible && <p className="password">{password}</p>}
        </div>
        <div className="delete-button-container">
          <button
            type="button"
            data-testid="delete"
            className="delete-button"
            onClick={onClickDeleteIcon}
          >
            <img
              className="delete-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default PasswordManager
