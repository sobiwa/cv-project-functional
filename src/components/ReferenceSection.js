import { useState } from 'react';
import Reference from './Reference';
import referenceIcon from '../assets/reference.svg';
import { addItem, deleteItem, DRAG } from './shared/helpers';
import {AddButton, DeleteButton, DragButton} from './shared/buttons'

export default function ReferenceSection({
  phoneDisplay,
  set,
  items,
}) {
  const [dragOn, setDragOn] = useState(false);
  const drag = DRAG(items, set, setDragOn);
  return (
    <section className="references">
      <div className="section-icon">
        <img src={referenceIcon} alt="reference icon" />
      </div>
      <div className="section-content">
        <h2 className="main--title">References</h2>
        <div className="section-items">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="section-item"
              onDragStart={(e) => drag.start(e, index)}
              onDragEnter={(e) => drag.enter(e, index)}
              onDragEnd={drag.drop}
              draggable={dragOn}
            >
              <Reference
                phoneDisplay={phoneDisplay}
                section="references"
                set={set}
                id={item.id}
                contact={item.contact.input}
                email={item.email.input}
                phone={item.phone.input}
                height={item.height}
              />
              <div className="flex-buttons reference--buttons">
                <DragButton toggle={setDragOn} />
                <DeleteButton
                  onClick={() => deleteItem(item.id, set)}
                  whatToDelete="item"
                />
              </div>
            </div>
          ))}
        </div>
        <AddButton
          onClick={() => addItem('references', set)}
          whatToAdd="item"
        />
      </div>
    </section>
  );
}
