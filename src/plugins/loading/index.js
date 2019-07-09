import Loading from './Loading.jsx';
import './main.scss';

let loadingInstance = 0;
let getLoadingInstance = () => {
  loadingInstance = loadingInstance || Loading.newInstance();
  return loadingInstance;
};
export default {
  status: 0,
  isInit: false,
  loading: getLoadingInstance(),
  open () {
    if (!this.status) {
      this.loading.show();
      this.status = 1;
    }
  },
  close () {
    if (this.status) {
      this.loading.hide();
      this.status = 0;
    }
  }
};
