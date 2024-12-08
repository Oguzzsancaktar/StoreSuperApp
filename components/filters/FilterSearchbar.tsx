import { InputStyled } from '../input';

interface IProps {
  handleMostSearched: (state: boolean) => void;
  handleChange(val: string): void;
  value?: string;
}
const FilterSearchbar: React.FC<IProps> = ({
  handleMostSearched,
  handleChange,
  value,
}) => {
  const handleBlur = () => {
    handleMostSearched(false);
  };

  const handleFocus = () => {
    handleMostSearched(true);
  };

  return (
    <InputStyled
      value={value}
      onChangeText={handleChange}
      handleBlur={handleBlur}
      handleFocus={handleFocus}
      placeholder="Search"
      name="filterSearchbar"
      type="text"
    />
  );
};

export default FilterSearchbar;
