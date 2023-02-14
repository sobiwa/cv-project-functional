export default function Layout({ layoutDisplay, setLayoutDisplay, hide }) {
  const handleChange = (e) => {
    const { checked, name } = e.target;
    setLayoutDisplay((prev) => ({ ...prev, [name]: checked }));
  };

  const displayText = (item) => {
    const returnObj = { heading: null, subCategory: false };
    switch (item) {
      case 'image':
        returnObj.heading = 'Header';
        returnObj.text = 'Image';
        break;
      case 'jobTitle':
        returnObj.text = 'Job Title';
        break;
      case 'details':
        returnObj.heading = 'Sidebar';
        returnObj.text = 'Details';
        break;
      case 'skills':
        returnObj.text = 'Skills';
        break;
      case 'skillScale':
        returnObj.text = 'Scale';
        returnObj.subCategory = true;
        break;
      case 'links':
        returnObj.text = 'Links';
        break;
      case 'linksImg':
        returnObj.text = 'Image';
        returnObj.subCategory = true;
        break;
      case 'linksDescription':
        returnObj.text = 'Description';
        returnObj.subCategory = true;
        break;
      case 'profile':
        returnObj.heading = 'Main';
        returnObj.text = 'Profile';
        break;
      case 'employment':
        returnObj.text = 'Employment';
        break;
      case 'education':
        returnObj.text = 'Education';
        break;
      case 'references':
        returnObj.text = 'References';
        break;
      case 'phone':
        returnObj.text = 'Phone';
        returnObj.subCategory = true;
        break;
      default:
        break;
    }
    return returnObj;
  };

  return (
    <div className="gray-out">
      <form className="layout-form" onSubmit={(e) => e.preventDefault()}>
        {Object.entries(layoutDisplay).map((item) => {
          const [name, bool] = item;
          const text = displayText(name);
          return (
            <div className={text.subCategory ? 'layout--sub-category' : ''}>
              {text.heading && <h2 className="form--title">{text.heading}</h2>}
              <label >
                {text.text}
                <input
                  className="form--input"
                  name={name}
                  type="checkbox"
                  checked={bool}
                  onChange={handleChange}
                />
              </label>
            </div>
          );
        })}
        <button
          className="layout-close-button"
          type="button"
          onClick={() => hide(false)}
        >
          Close
        </button>
      </form>
    </div>
  );
}
