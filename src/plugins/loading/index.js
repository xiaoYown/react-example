import Loading from './Loading.jsx';
import './main.scss';

let loadingInstance = 0;
let getLoadingInstance = () => {
  loadingInstance = loadingInstance || Loading.newInstance();
  return loadingInstance;
};
export default {
  status: 0,
  open () {
    if (!this.status) {
      this.status = 1;
      getLoadingInstance();
    }
  },
  close () {
    if (this.status && loadingInstance) {
      this.status = 0;
      loadingInstance.destroy();
      loadingInstance = null;
    }
  }
};
