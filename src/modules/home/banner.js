import './index.scss';
import AppBase, {$wechat} from "components/scripts/index";
import banner1 from '../../assets/images/banner/banner-1-1.jpg';
import banner2 from '../../assets/images/banner/banner-1-2.jpg';
import banner3 from '../../assets/images/banner/banner-1-3.jpg';
import banner4 from '../../assets/images/banner/banner-1-4.jpg';
import banner5 from '../../assets/images/banner/banner-1-5.jpg';
import banner6 from '../../assets/images/banner/banner-1-6.jpg';
import banner7 from '../../assets/images/banner/banner-1-7.jpg';

export default class extends AppBase {

  componentDidMount() {
    $wechat.updateTitle('逻辑分享家');
    $wechat.settingShare();
  }

  render() {
    return (
      <section className="home-banner">
        <img src={banner1} alt=""/>
        <img src={banner2} alt=""/>
        <img src={banner3} alt=""/>
        <img src={banner4} alt=""/>
        <img src={banner5} alt=""/>
        <img src={banner6} alt=""/>
        <a href="/home">
          <img src={banner7} alt=""/>
        </a>
      </section>
    )
  }
}
