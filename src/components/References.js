import { Component } from 'react';
import employmentIcon from '../assets/employment.svg';
import educationIcon from '../assets/education.svg';
import referenceIcon from '../assets/reference.svg';

export default class References extends Component {
  iconSrc = (sec) => {
    switch (sec) {
      case 'employment':
        return employmentIcon;
      case 'education':
        return educationIcon;
      case 'reference':
        return referenceIcon;
      default:
        return;
    }
  };
  render() {
    const { section } = this.props;
    return (
      <section className={section}>
        <div className="section-icon">
          <img src={employmentIcon} alt="employment icon" />
        </div>
        <div className="section-content">
          <h2 className="main--title">Employment History</h2>
          <div className="section-items">
            {employment.map((item) => (
              <div key={item.id} className="employment-item">
                <Employment
                  key={item.id}
                  id={item.id}
                  location={item.location.input}
                  duration={item.duration.input}
                  tasks={item.tasks}
                  deleteTask={deleteNested}
                  handleBlur={handleBlur('employment')}
                  updateComponentHeight={updateComponentHeight}
                  height={item.height}
                />
                <div className="flex-buttons employment--buttons">
                  <button
                    title="Add task"
                    className="icon-button add-task-button"
                    type="button"
                    onClick={() => addNested('employment', 'tasks', item.id)}
                  >
                    <img src={addTaskIcon} alt="add task" />
                  </button>
                  <DeleteButton
                    onClick={() => deleteItem(item.id, 'employment')}
                    whatToDelete="employment"
                  />
                </div>
              </div>
            ))}
          </div>
          <AddButton onClick={addEmployment} whatToAdd="employment" />
        </div>
      </section>
    );
  }
}
