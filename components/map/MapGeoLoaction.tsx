import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import IListingPost from '@/interfaces/listing/IListingPost';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface IProps {
  geoLocation: {
    latitude: IListingPost['listingAddress']['latitude'];
    longitude: IListingPost['listingAddress']['longitude'];
  };
}
const MapGeoLoaction: React.FC<IProps> = ({ geoLocation }) => {
  return (
    <View
      style={[
        {
          height: APP_STYLE_VALUES.WH_SIZES.xl3,
          borderRadius: APP_STYLE_VALUES.RADIUS_SIZES.md,
          overflow: 'hidden',
        },
      ]}
    >
      <MapView
        style={[{ flex: 1 }]}
        initialRegion={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
          }}
          title={'Konum Başlığı'}
          description={'Konum Açıklaması'}
        />
      </MapView>
    </View>
  );
};

export default MapGeoLoaction;
