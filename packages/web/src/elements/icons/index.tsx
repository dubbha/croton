import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon as Icon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import {
  faBookmark,
  faLeaf,
  faPlus,
  faSeedling,
  faHandHoldingHeart,
  faFireAlt,
  faMapMarkerAlt,
  faCheck,
  faTimes,
  faFileImage,
} from '@fortawesome/free-solid-svg-icons';

const wrap = (icon: IconProp) => (props: Partial<FontAwesomeIconProps>) =>
  <Icon {...props} icon={icon} />; // eslint-disable-line react/jsx-props-no-spreading

export const BookmarkIcon = wrap(faBookmark);
export const LeafIcon = wrap(faLeaf);
export const PlusIcon = wrap(faPlus);
export const SeedlingIcon = wrap(faSeedling);
export const HandHoldingHeartIcon = wrap(faHandHoldingHeart);
export const FireAltIcon = wrap(faFireAlt);
export const MapMarkerIcon = wrap(faMapMarkerAlt);
export const CheckIcon = wrap(faCheck);
export const TimesIcon = wrap(faTimes);
export const FileImageIcon = wrap(faFileImage);
