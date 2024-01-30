function DropDown() {
    return (
        <div className="dropdown">
        <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="close-CSS">
          <img src="https://img.freepik.com/premium-photo/future-possibilities-futuristic-cyborg-human-modified-with-digital-technology-generative-ai_549702-454.jpg"
          className="rounded-circle"></img>
        </button>
        <ul className="dropdown-menu">
          <li><a className="dropdown-item" href="!#">Log Out</a></li>
        </ul>
      </div>
    );
  }

export default DropDown;