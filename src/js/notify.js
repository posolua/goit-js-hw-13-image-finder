import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'pnotify/dist/es/PNotifyAnimate';

export default {
  totalNummber(totalValue) {
    const notice = PNotify.notice({
      text: `We found ${totalValue} images!`,
      closer: false,
      sticker: false,
    });
    notice.on('click', () => {
      notice.close();
    });
  },
};
