import { Component } from 'react';
import Item from './Item';
import { DeleteButton, AddButton } from './shared/helpers';
import employmentIcon from '../assets/employment.svg';
import educationIcon from '../assets/education.svg';
import referenceIcon from '../assets/reference.svg';
import addToListIcon from '../assets/add-task.svg';

export default class Section extends Component {
  fillIns = (sec) => {
    switch (sec) {
      case 'employment':
        return {
          icon: employmentIcon,
          title: 'Employment History',
          subChild: 'task',
        };
      case 'education':
        return { icon: educationIcon, title: 'Education', subChild: 'detail' };
      case 'reference':
        return { icon: referenceIcon, title: 'References' };
      default:
        return;
    }
  };
  render() {
    const {
      section,
      items,
      addItem,
      deleteItem,
      addSubChild,
      deleteSubChild,
      handleBlur,
      updateComponentHeight,
    } = this.props;
    const all = this.fillIns(section);
    console.log(items);
    return (
      <section className={section}>
        <div className="section-icon">
          <img src={all.icon} alt={`${section} icon`} />
        </div>
        <div className="section-content">
          <h2 className="main--title">{all.title}</h2>
          <div className="section-items">
            {items.map((item) => (
              <div key={item.id} className={`section-item`}>
                <Item
                  key={item.id}
                  id={item.id}
                  section={section}
                  location={item.location.input}
                  duration={item.duration.input}
                  subChildren={item.subChildren}
                  deleteSubChild={deleteSubChild}
                  handleBlur={handleBlur(section)}
                  updateComponentHeight={updateComponentHeight}
                  height={item.height}
                />
                <div className={`flex-buttons ${section}--buttons`}>
                  <button
                    title={`Add ${all.subChild}`}
                    className="icon-button add-sub-child-button"
                    type="button"
                    onClick={() => addSubChild(section, item.id)}
                  >
                    <img src={addToListIcon} alt="add task" />
                  </button>
                  <DeleteButton
                    onClick={() => deleteItem(item.id, section)}
                    whatToDelete='item'
                  />
                </div>
              </div>
            ))}
          </div>
          <AddButton onClick={() => addItem(section)} whatToAdd="item" />
        </div>
      </section>
    );
  }
}
