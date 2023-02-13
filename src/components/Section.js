import { useState } from 'react';
import Item from './Item';
import {
  addItem,
  deleteItem,
  addSubChild,
  DRAG,
} from './shared/helpers';
import { DeleteButton, AddButton, DragButton} from './shared/buttons';
import employmentIcon from '../assets/employment.svg';
import educationIcon from '../assets/education.svg';
import referenceIcon from '../assets/reference.svg';
import addToListIcon from '../assets/add-task.svg';

export default function Section({ section, set, items }) {
  const [dragOn, setDragOn] = useState(false);
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

  const drag = DRAG(items, set, setDragOn);

  return (
    <section className={section}>
      <div className="section-icon">
        <img src={all.icon} alt={`${section} icon`} />
      </div>
      <div className="section-content">
        <h2 className="main--title">{all.title}</h2>
        <div className="section-items">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`section-item`}
              onDragStart={(e) => drag.start(e, index)}
              onDragEnter={(e) => drag.enter(e, index)}
              onDragEnd={drag.drop}
              draggable={dragOn}
            >
              <Item
                key={item.id}
                id={item.id}
                section={section}
                set={set}
                location={item.location.input}
                duration={item.duration.input}
                subChildren={item.subChildren}
                height={item.height}
              />
              <div className={`flex-buttons ${section}--buttons`}>
                <DragButton toggle={setDragOn} />
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
