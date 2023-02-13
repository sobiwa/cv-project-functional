import Reference from './Reference';
import referenceIcon from '../assets/reference.svg'
import Section from './Section';
import { AddButton, DeleteButton } from './shared/helpers';

export default function PageMain ({
  display,
  employment,
  setEmployment,
  education,
  setEducation,
  references,
  setReferences,
  handleBlur,
  addItem,
  deleteItem,
  addSubChild,
  deleteSubChild,
  updateComponentHeight,
}) {

    return (
      <div>
          {display.employment && employment.length > 0 && (
            <Section 
            section='employment'
            set={setEmployment}
            items={employment}
            addItem={addItem}
            deleteItem={deleteItem}
            addSubChild={addSubChild}
            deleteSubChild={deleteSubChild}
            handleBlur={handleBlur}
            updateComponentHeight={updateComponentHeight}
          />)}
          {display.education && education.length > 0 && (
            <Section 
            section='education'
            set={setEducation}
            items={education}
            addItem={addItem}
            deleteItem={deleteItem}
            addSubChild={addSubChild}
            deleteSubChild={deleteSubChild}
            handleBlur={handleBlur}
            updateComponentHeight={updateComponentHeight}
          />)}
          {display.references && references.length > 0 && (
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
                      phoneDisplay={display.phone}
                      section='references'
                      set={setReferences}
                      id={item.id}
                      contact={item.contact.input}
                      email={item.email.input}
                      phone={item.phone.input}
                      handleBlur={handleBlur}
                      updateComponentHeight={updateComponentHeight}
                      height={item.height}
                    />
                    <div className='flex-buttons reference--buttons'>
                      <DeleteButton
                        onClick={() => deleteItem(item.id, setReferences)}
                        whatToDelete='item'
                      />
                    </div>
                  </div>
                ))}
              </div>
              <AddButton onClick={() => addItem('references', setReferences)} whatToAdd='item' />
            </div>
          </section>
          )}
        </div>
    )
  }
