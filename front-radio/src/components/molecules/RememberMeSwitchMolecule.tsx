import FormLabelWithIcon from "../atoms/FormLabelWithIconAtom";

interface RememberMeSwitchProps {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: string
}

const RememberMeSwitch: React.FC<RememberMeSwitchProps> = ({ isChecked, onChange, color }) => (
  <FormLabelWithIcon isChecked={isChecked} onChange={onChange} color={color}/>
);

export default RememberMeSwitch;
