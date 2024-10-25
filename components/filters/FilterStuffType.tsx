import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { map } from 'lodash';

const APP_ADVERT_TYPE_OPTIONS = [
  { label: 'Real Estate', value: 'realEstate' },
  { label: 'Car', value: 'car' },
  { label: 'Electronic', value: 'electronic' },
];

const FilterStuffType = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    APP_ADVERT_TYPE_OPTIONS[0].value
  ); // Varsayılan değeri ayarla
  const pickerRef = useRef();

  return (
    <View style={styles.container}>
      <Picker
        ref={pickerRef}
        accessibilityLabel="Choose an option"
        accessibilityRole="picker"
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        style={styles.picker} // Stil ekledik
        dropdownIconColor="gray" // Aşağı ok rengi
      >
        {map(APP_ADVERT_TYPE_OPTIONS, ({ label, value }) => (
          <Picker.Item label={label} value={value} key={value} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  picker: {
    height: 50,
    width: '100%', // Genişliği %100 olarak ayarladık
    borderColor: 'gray', // Kenar rengi
    borderWidth: 1, // Kenar kalınlığı
    borderRadius: 5, // Köşe yuvarlama
    backgroundColor: 'white', // Arka plan rengi
  },
});

export default FilterStuffType;
