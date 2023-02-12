import Item from './Item';
import { DeleteButton, AddButton } from './shared/helpers';
import employmentIcon from '../assets/employment.svg';
import educationIcon from '../assets/education.svg';
import referenceIcon from '../assets/reference.svg';
import addToListIcon from '../assets/add-task.svg';

export default function Section({
  section,
  set,
  items,
  addItem,
  deleteItem,
  addSubChild,
  deleteSubChild,
  handleBlur,
  updateComponentHeight,
}) {
  const fillIns = (sec) => {
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
  const all = fillIns(section);
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
                set={set}
                location={item.location.input}
                duration={item.duration.input}
                subChildren={item.subChildren}
                deleteSubChild={deleteSubChild}
                handleBlur={handleBlur}
                updateComponentHeight={updateComponentHeight}
                height={item.height}
              />
              <div className={`flex-buttons ${section}--buttons`}>
                <button
                  title={`Add ${all.subChild}`}
                  className="icon-button add-sub-child-button"
                  type="button"
                  onClick={() => addSubChild(section, item.id, set)}
                >
                  <img src={addToListIcon} alt="add task" />
                </button>
                <DeleteButton
                  onClick={() => deleteItem(item.id, set)}
                  whatToDelete="item"
                />
              </div>
            </div>
          ))}
        </div>
        <AddButton onClick={() => addItem(section, set)} whatToAdd="item" />
      </div>
    </section>
  );
}
