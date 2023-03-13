import { FormInputLabel, Group, Input } from './form-input.styles';

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group className="group">
      <Input className="form-input" {...otherProps} />
      {label && (
        <FormInputLabel
          shrink={!!otherProps.value.length}
          className={`form-input-label${otherProps.value.length ? ' shrink' : ''}`}>
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
