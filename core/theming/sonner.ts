import type { ToasterProps } from 'sonner';

export const toasterBaseProps: ToasterProps = {
  position: 'top-right',
  offset: { top: 80 },
  toastOptions: {
    classNames: {
      title: 'font-bold!',
      success: 'text-success!',
    },
  },
};
