import ReferenceSection from './ReferenceSection';
import Section from './Section';

export default function PageMain({
  display,
  employment,
  setEmployment,
  education,
  setEducation,
  references,
  setReferences,
}) {
  return (
    <div>
      {display.employment && employment.length > 0 && (
        <Section
          section="employment"
          set={setEmployment}
          items={employment}
        />
      )}
      {display.education && education.length > 0 && (
        <Section
          section="education"
          set={setEducation}
          items={education}
        />
      )}
      {display.references && references.length > 0 && (
        <ReferenceSection
          phoneDisplay={display.phone}
          set={setReferences}
          items={references}
        />
      )}
    </div>
  );
}
