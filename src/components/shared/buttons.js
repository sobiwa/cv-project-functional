import addIcon from '../../assets/add.svg';
import deleteIcon from '../../assets/delete.svg';
import dragIcon from '../../assets/drag.svg';

export function AddButton({ onClick, whatToAdd }) {
  return (
    <button
      className={`icon-button add-button add-${whatToAdd}-button`}
      type="button"
      onClick={onClick}
    >
      <img src={addIcon} alt={`add ${whatToAdd}`} />
    </button>
  );
}

export function DeleteButton({ onClick, whatToDelete }) {
  return (
    <button
      className={`icon-button delete-button delete-${whatToDelete}-button`}
      type="button"
      onClick={onClick}
    >
      <img src={deleteIcon} alt={`delete ${whatToDelete}`} />
    </button>
  );
}

export function DragButton({ toggle }) {
  return (
    <div
      className="icon-button drag-button"
      onMouseDown={() => toggle(true)}
      onMouseUp={() => toggle(false)}
    >
      <img src={dragIcon} alt="drag" />
    </div>
  );
}
