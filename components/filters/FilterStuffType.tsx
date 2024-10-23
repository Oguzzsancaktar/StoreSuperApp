import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

const FilterStuffType = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { label: 'Real Estate', value: 'realEstate' },
    { label: 'Car', value: 'car' },
    { label: 'electronic', value: 'electronic' },
  ]);

  return (
    <DropDownPicker
      badgeStyle={{
        backgroundColor: 'red',
      }}
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
  );
};

export default FilterStuffType;
