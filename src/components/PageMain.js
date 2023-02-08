import { Component } from 'react';
import Reference from './Reference';
import referenceIcon from '../assets/reference.svg'
import Section from './Section';
import { AddButton, DeleteButton } from './shared/helpers';

export default class PageMain extends Component {
  render() {
    const {
      employment,
      education,
      references,
      handleBlur,
      addItem,
      deleteItem,
      addSubChild,
      deleteSubChild,
      updateComponentHeight,
    } = this.props;
    return (
      <div>
          {employment.length > 0 && (
            <Section 
            section='employment'
            items={employment}
            addItem={addItem}
            deleteItem={deleteItem}
            addSubChild={addSubChild}
            deleteSubChild={deleteSubChild}
            handleBlur={handleBlur}
            updateComponentHeight={updateComponentHeight}
          />)}
          {education.length > 0 && (
            <Section 
            section='education'
            items={education}
            addItem={addItem}
            deleteItem={deleteItem}
            addSubChild={addSubChild}
            deleteSubChild={deleteSubChild}
            handleBlur={handleBlur}
            updateComponentHeight={updateComponentHeight}
          />)}
          {references.length > 0 && (
            <section className='references'>
            <div className="section-icon">
              <img src={referenceIcon} alt='reference icon' />
            </div>
            <div className="section-content">
              <h2 className="main--title">References</h2>
              <div className="section-items">
                {references.map((item) => (
                  <div key={item.id} className='section-item'>
                    <Reference
                      id={item.id}
                      contact={item.contact.input}
                      email={item.email.input}
                      phone={item.phone.input}
                      section='references'
                      handleBlur={handleBlur('references')}
                      updateComponentHeight={updateComponentHeight}
                      height={item.height}
                    />
                    <div className='flex-buttons reference--buttons'>
                      <DeleteButton
                        onClick={() => deleteItem(item.id, 'references')}
                        whatToDelete='item'
                      />
                    </div>
                  </div>
                ))}
              </div>
              <AddButton onClick={() => addItem('references')} whatToAdd='item' />
            </div>
          </section>
          )}
        </div>
    )
  }
}