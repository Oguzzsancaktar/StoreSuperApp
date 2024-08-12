import APP_STYLE_VALUES from '@/constants/APP_STYLE_VALUES';
import { StyleSheet } from 'react-native';

const { MAX_WIDTH, SPACE_SIZES } = APP_STYLE_VALUES;

const useCommonStyles = () => {

  const absolutePositionStyles = StyleSheet.create({
    absoluteFill: {
      ...StyleSheet.absoluteFillObject,
    },
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
    rowCenterWrap: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  })


  const maxWidthStyles = StyleSheet.create({
    maxWidthXxl: {
      maxWidth: MAX_WIDTH.xxl,
    },
    maxWidthXl: {
      maxWidth: MAX_WIDTH.xl,
    },
    maxWidthLg: {
      maxWidth: MAX_WIDTH.lg,
    },
    maxWidthMd: {
      maxWidth: MAX_WIDTH.md,
    },
    maxWidthSm: {
      maxWidth: MAX_WIDTH.sm,
    },
  })


  const spacingStyles = {
    p0: {
      padding: SPACE_SIZES.sp0,
    },
    py0: {
      paddingVertical: SPACE_SIZES.sp0,
    },
    p1: {
      padding: SPACE_SIZES.sp1,
    },
    p2: {
      padding: SPACE_SIZES.sp2,
    },
    p3: {
      padding: SPACE_SIZES.sp3,
    },
    p4: {
      padding: SPACE_SIZES.sp4,
    },
    p5: {
      padding: SPACE_SIZES.sp5,
    },
    p6: {
      padding: SPACE_SIZES.sp6,
    },
    p7: {
      padding: SPACE_SIZES.sp7,
    },
    p8: {
      padding: SPACE_SIZES.sp8,
    },
    p9: {
      padding: SPACE_SIZES.sp9,
    },
    m0: {
      margin: SPACE_SIZES.sp0,
    },
    m1: {
      margin: SPACE_SIZES.sp1,
    },
    m2: {
      margin: SPACE_SIZES.sp2,
    },
    m3: {
      margin: SPACE_SIZES.sp3,
    },
    m4: {
      margin: SPACE_SIZES.sp4,
    },
    m5: {
      margin: SPACE_SIZES.sp5,
    },
    m6: {
      margin: SPACE_SIZES.sp6,
    },
    m7: {
      margin: SPACE_SIZES.sp7,
    },
    m8: {
      margin: SPACE_SIZES.sp8,
    },
    m9: {
      margin: SPACE_SIZES.sp9,
    },
    g0: {
      gap: SPACE_SIZES.sp0,
    },
    g1: {
      gap: SPACE_SIZES.sp1,
    },
    g2: {
      gap: SPACE_SIZES.sp2,
    },
    g3: {
      gap: SPACE_SIZES.sp3,
    },
    g4: {
      gap: SPACE_SIZES.sp4,
    },
    g5: {
      gap: SPACE_SIZES.sp5,
    },
    g6: {
      gap: SPACE_SIZES.sp6,
    },
    g7: {
      gap: SPACE_SIZES.sp7,
    },
    g8: {
      gap: SPACE_SIZES.sp8,
    },
    g9: {
      gap: SPACE_SIZES.sp9,
    },
  }



  return {
    absolutePositionStyles,
    flexStyles,
    maxWidthStyles,
    spacingStyles
  }

}

export default useCommonStyles;
