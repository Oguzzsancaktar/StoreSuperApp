import { StyleSheet } from 'react-native';


const useCommonStyles = () => {
  const absolutePositionStyles = StyleSheet.create({
    absoluteFill: {
      ...StyleSheet.absoluteFillObject,
    },
    relative: {
      position: "relative"
    }
  })



  const flexStyles = StyleSheet.create({
    // Flex Positioning Styles
    selfCenter: {
      alignSelf: 'center',
    },
    flexCenter: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    colBetween: {
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
    colStart: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: "flex-start"
    },

    colCenter: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: "center"
    },

    rowWrap: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-start",
      flexWrap: 'wrap',
    },

    rowStart: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-start",
      flexWrap: "nowrap"
    },
    rowEnd: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "flex-end",
      flexWrap: "nowrap"
    },
    rowBetween: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      flexWrap: "nowrap"
    },
    rowCenterWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
    rowCenter: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'nowrap',
    },
  })





  return {
    absolutePositionStyles,
    flexStyles,
  }

}


export type ICommonStyles = ReturnType<typeof useCommonStyles>;

export default useCommonStyles;
