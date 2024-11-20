import { Toast } from 'toastify-react-native';
import { ToastManagerProps } from 'toastify-react-native/utils/interfaces';

export const toastError = (
  msg: string,
  pos?: ToastManagerProps['position']
) => {
  if (pos === undefined) pos = 'bottom';

  Toast.error(msg ? msg : 'Something went wrong danger', pos);
};

export const toastWarning = (
  msg: string,
  pos?: ToastManagerProps['position']
) => {
  if (pos === undefined) pos = 'bottom';

  Toast.warn(msg ? msg : 'Something went wrong warn', pos);
};

export const toastSuccess = (
  msg: string,
  pos?: ToastManagerProps['position']
) => {
  if (pos === undefined) pos = 'bottom';

  Toast.success(msg ? msg : 'Success', pos);
};

export const toastInfo = (msg: string, pos?: ToastManagerProps['position']) => {
  if (pos === undefined) pos = 'bottom';

  Toast.info(msg ? msg : 'Info', pos);
};
