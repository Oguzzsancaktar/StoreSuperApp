import { IIconOptions, IIconProps } from "@/interfaces/app";

import IconBell from "./IconBell";
import IconBlock from "./IconBlock";
import IconBookmark from "./IconBookmark";
import IconCalendar from "./IconCalendar";
import IconCamera from "./IconCamera";
import IconChatSupport from "./IconChatSupport";
import IconCheck from "./IconCheck";
import IconChevronDown from "./IconChevronDown";
import IconChevronLeft from "./IconChevronLeft";
import IconChevronRight from "./IconChevronRight";
import IconChevronUp from "./IconChevronUp";
import IconCircleCheck from "./IconCircleCheck";
import IconCircleClose from "./IconCircleClose";
import IconCircleTopic from "./IconCircleTopic";
import IconClose from "./IconClose";
import IconConnect from "./IconConnect";
import IconDelivered from "./IconDelivered";
import IconEdit from "./IconEdit";
import IconEmail from "./IconEmail";
import IconEmpty from "./IconEmpty";
import IconEyeHide from "./IconEyeHide";
import IconEyeShow from "./IconEyeShow";

import IconFAQ from "./IconFAQ";
import IconFilter from "./IconFilter";
import IconFlash from "./IconFlash";
import IconGallery from "./IconGallery";
import IconHeart from "./IconHeart";

import IconHome from "./IconHome";
import IconKey from "./IconKey";
import IconLocation from "./IconLocation";
import IconLock from "./IconLock";
import IconLogout from "./IconLogout";

import IconMegaphone from "./IconMegaphone";
import IconMenu from "./IconMenu";

import IconNoFlash from "./IconNoFlash";
import IconOptions from "./IconOptions";
import IconPen from "./IconPen";
import IconPhone from "./IconPhone";

import IconPrivacy from "./IconPrivacy";
import IconQR from "./IconQR";
import IconSearch from "./IconSearch";
import IconSendMessage from "./IconSendMessage";
import IconSent from "./IconSent";
import IconSettingCog from "./IconSettingCog";
import IconShare from "./IconShare";
import IconSmartphone from "./IconSmartphone";
import IconSocialApple from "./IconSocialApple";
import IconSocialFacebook from "./IconSocialFacebook";
import IconSocialGoogle from "./IconSocialGoogle";
import IconSocialInstagram from "./IconSocialInstagram";
import IconSocialSmallFacebook from "./IconSocialSmallFacebook";
import IconSocialSmallInstagram from "./IconSocialSmallInstagram";
import IconSocialSmallWhatsapp from "./IconSocialSmallWhatsapp";
import IconSocialSmallX from "./IconSocialSmallX";
import IconSocialWhatsapp from "./IconSocialWhatsapp";
import IconSocialX from "./IconSocialX";
import IconSortList from "./IconSortList";
import IconStore from "./IconStore";
import IconSwitchCamera from "./IconSwitchCamera";
import IconTag from "./IconTag";
import IconLogoPrimary from "./IconLogoPrimary";
import IconTechnical from "./IconTechnical";
import IconTheme from "./IconTheme";
import IconThumbsUp from "./IconThumbsUp";

import IconTrash from "./IconTrash";
import IconUnfollow from "./IconUnfollow";
import IconUpload from "./IconUpload";
import IconUser from "./IconUser";
import IconUserFollow from "./IconUserFollow";
import IconUsers from "./IconUsers";
import IconVehicle from "./IconVehicle";
import IconWeb from "./IconWeb";
import IconWorld from "./IconWorld";


// Circle
import IconPlusCircle from './circle/IconPlusCircle'

// Filled
import IconBookmarkFilled from "./filled/IconBookmarkFilled";
import IconEyeShowFilled from "./filled/IconEyeShowFilled";
import IconHeartFilled from "./filled/IconHeartFilled";
import IconProfileFilled from "./filled/IconProfileFilled";
import IconMessageFilled from "./filled/IconMessageFilled";
import IconMailFill from "./filled/IconMailFilled";
import IconPhoneFilled from "./filled/IconPhoneFilled";
import IconThumbsUpFill from "./filled/IconThumbsUpFilled";


const ICONS = {
  IconBell,
  IconBlock,
  IconBookmark,
  IconBookmarkFilled,
  IconCalendar,
  IconCamera,
  IconChatSupport,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircleCheck,
  IconCircleClose,
  IconCircleTopic,
  IconClose,
  IconConnect,
  IconDelivered,
  IconEdit,
  IconEmail,
  IconEmpty,
  IconEyeHide,
  IconEyeShow,
  IconEyeShowFilled,
  IconFAQ,
  IconFilter,
  IconFlash,
  IconGallery,
  IconHeart,
  IconHeartFilled,
  IconHome,
  IconKey,
  IconLocation,
  IconLock,
  IconLogout,
  IconMailFill,
  IconMegaphone,
  IconMenu,
  IconMessageFilled,
  IconNoFlash,
  IconOptions,
  IconPen,
  IconPhone,
  IconPhoneFilled,
  IconPrivacy,
  IconQR,
  IconSearch,
  IconSendMessage,
  IconSent,
  IconSettingCog,
  IconShare,
  IconSmartphone,
  IconSocialApple,
  IconSocialFacebook,
  IconSocialGoogle,
  IconSocialInstagram,
  IconSocialSmallFacebook,
  IconSocialSmallInstagram,
  IconSocialSmallWhatsapp,
  IconSocialSmallX,
  IconSocialWhatsapp,
  IconSocialX,
  IconSortList,
  IconStore,
  IconSwitchCamera,
  IconTag,
  IconLogoPrimary,
  IconTechnical,
  IconTheme,
  IconThumbsUp,
  IconThumbsUpFill,
  IconTrash,
  IconUnfollow,
  IconUpload,
  IconUser,
  IconUserFollow,
  IconUsers,
  IconVehicle,
  IconWeb,
  IconWorld,
  // Filled
  IconProfileFilled,
  // Circle
  IconPlusCircle,
}

export const getIconWithProps = (iconName: IIconOptions, props: IIconProps = {}) => {
  const Icon = ICONS[iconName];

  return Icon(props);
};

export default ICONS;
