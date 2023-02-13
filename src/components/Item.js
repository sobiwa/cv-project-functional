import { useEffect, useRef, useState } from 'react';
import InputChild from './InputChild';
import { DeleteButton, DRAG } from './shared/helpers';
import dragIcon from '../assets/drag.svg';

export default function Item({
  height,
  updateComponentHeight,
  section,
  set,
  location,
  duration,
  subChildren,
  deleteSubChild,
  handleBlur,
  id,
}) {
  const divElement = useRef(0);

  useEffect(() => {
    if (height === divElement.current.scrollHeight) return;
    updateComponentHeight(id, divElement.current.scrollHeight, set);
  });

  const setSubChildren = (newArr) => {
    set((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, subChildren: newArr } : item
      )
    );
  };

  const [dragOn, setDragOn] = useState(false);
  
  const drag = DRAG(subChildren, setSubChildren, setDragOn);
  
  return (
    <div ref={divElement}>
      <InputChild
        className={`${section}--location`}
        text={location}
        type="text"
        handleBlur={handleBlur(set, 'location', [id])}
      />
      <InputChild
        className={`${section}--duration`}
        text={duration}
        type="text"
        handleBlur={handleBlur(set, 'duration', [id])}
      />
      <ul className={`section--sub-children`}>
        {subChildren.map((item, index) => (
          <li
            key={item.id}
            onDragStart={(e) => drag.start(e, index)}
            onDragEnter={(e) => drag.enter(e, index)}
            onDragEnd={drag.drop}
            draggable={dragOn}
          >
            <div
              className="icon-button sub-drag-button"
              onMouseDown={() => setDragOn(true)}
              onMouseUp={() => setDragOn(false)}
            >
              <img src={dragIcon} alt="drag" />
            </div>
            <span className='sub-child-dot'></span>
            <InputChild
              text={item.data.input}
              type="textarea"
              handleBlur={handleBlur(set, 'subChildren', [id, item.id])}
            />
            <DeleteButton
              onClick={() => deleteSubChild(id, item.id, set)}
              whatToDelete={'sub-child'}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
