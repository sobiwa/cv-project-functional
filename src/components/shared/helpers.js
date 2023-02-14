import { useRef } from 'react';
import uniqid from 'uniqid';

export function handleBlur(set, target, ids) {
  return (newText) => {
    set((prevState) => findAndEdit(prevState, ids, newText, target));
  };
}

function findAndEdit(data, id, newText, target = 'data') {
  if (id.length === 1) {
    return data.map((item) =>
      item.id === id[0]
        ? {
            ...item,
            [target]: {
              ...item[target],
              input: newText === '' ? item[target].default : newText,
            },
          }
        : item
    );
  }
  const idArrayCopy = [...id];
  const currentId = idArrayCopy.shift();
  return data.map((item) =>
    item.id === currentId
      ? { ...item, [target]: findAndEdit(item[target], idArrayCopy, newText) }
      : item
  );
}

export const updateComponentHeight = (id, newHeight, set) => {
  set((prevState) =>
    prevState.map((item) =>
      item.id === id ? { ...item, height: newHeight } : item
    )
  );
};

export const newItem = (defaultText) => ({
  input: defaultText,
  default: defaultText,
});

//

const newTask = () => ({
  id: uniqid(),
  data: newItem(
    'Pet cats and ensured they received abundant quantities of love.'
  ),
});
const newDetail = () => ({
  id: uniqid(),
  data: newItem('GPA: 4.0'),
});

const createNewEmployment = () => {
  return {
    id: uniqid(),
    location: newItem('Cat Consultant at Feline Corp., New York'),
    duration: newItem('April 1993 - February 2023'),
    subChildren: [newTask()],
    height: 0,
  };
};

const createNewEducation = () => {
  return {
    id: uniqid(),
    location: newItem('Bachelor of Science, Cat University'),
    duration: newItem('August 2003 - May 2007'),
    subChildren: [newDetail()],
    height: 0,
  };
};

const createNewReference = () => {
  return {
    id: uniqid(),
    contact: newItem('Joey Pantalones from CAT Corp., New York'),
    email: newItem('joeyPants@pmail.com'),
    phone: newItem('(444) 555 - 6666'),
    height: 0,
  };
};

export const creator = (section) => {
  switch (section) {
    case 'employment':
      return createNewEmployment();
    case 'education':
      return createNewEducation();
    case 'references':
      return createNewReference();
    default:
      return;
  }
};

export const addItem = (section, set) => {
  set((prevState) => [...prevState, creator(section)]);
};

export const deleteItem = (id, set) => {
  set((prevState) => prevState.filter((item) => item.id !== id));
};

export const addSubChild = (section, id, set) => {
  const subCreator = section === 'employment' ? newTask : newDetail;
  set((prevState) =>
    prevState.map((item) =>
      item.id === id
        ? { ...item, subChildren: [...item.subChildren, subCreator()] }
        : item
    )
  );
};

export const deleteSubChild = (id, nestedId, set) => {
  set((prevState) =>
    prevState.map((item) =>
      item.id === id
        ? {
            ...item,
            subChildren: item.subChildren.filter(
              (nested) => nested.id !== nestedId
            ),
          }
        : item
    )
  );
};

//

export const retrieveDataOrRenderDefault = (section, creator) => {
  const dataRetrieved = JSON.parse(localStorage.getItem(section));
  return dataRetrieved && dataRetrieved.length
    ? dataRetrieved
    : [creator(section)];
};



export function DRAG(data, setData, setDraggable) {
  const item = useRef(null);
  const overItem = useRef(null);
  const start = (e, position) => {
    e.stopPropagation();
    item.current = position;
  };

  const enter = (e, position) => {
    e.stopPropagation();
    overItem.current = position;
  };

  const drop = (e) => {
    e.stopPropagation();
    const copy = [...data];
    const draggedItem = copy[item.current];
    copy.splice(item.current, 1);
    copy.splice(overItem.current, 0, draggedItem);
    item.current = null;
    overItem.current = null;
    setData(copy);
    setDraggable(false);
    console.log(copy, draggedItem, item, overItem);
  };

  return {
    start,
    enter,
    drop,
  };
}
