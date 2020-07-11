import {IS_GROUP} from './type';
export const GroupAction = () => {
  return dispatch => {
    dispatch(SET_ISGROUP(true));
  };
};

export const SET_ISGROUP = group => {
  return {
    type: IS_GROUP,
    group,
  };
};
