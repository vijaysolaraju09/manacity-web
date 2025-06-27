import "./Home.scss";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import {
  sampleOffers,
  sampleVerifiedUsers,
  sampleEvents,
  sampleSpecialProducts,
  banner,
} from "../../data/sampleHomeData";

const Home = () => {
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="home">
      {/* Admin Banner */}
      <motion.div
        className="banner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => banner.link && navigate(banner.link)}
      >
        <img src={banner.image} alt="Admin Update" />
        <div className="banner-text">
          <h3>{banner.title}</h3>
          <p>{banner.subtitle}</p>
        </div>
      </motion.div>

      {/* Sections */}
      <Section
        title="Shop Offers"
        data={sampleOffers}
        type="product"
        navigate={navigate}
        settings={settings}
      />
      <Section
        title="Verified Users"
        data={sampleVerifiedUsers}
        type="user"
        navigate={navigate}
        settings={settings}
      />
      <Section
        title="Events"
        data={sampleEvents}
        type="event"
        navigate={navigate}
        settings={settings}
      />
      <Section
        title="Special Shop Products"
        data={sampleSpecialProducts}
        type="product"
        navigate={navigate}
        settings={settings}
      />
    </div>
  );
};

const Section = ({ title, data, type, navigate, settings }: any) => (
  <div className="section">
    <h2>{title}</h2>
    <Slider {...settings}>
      {data.map((item: any) => (
        <motion.div
          key={item._id}
          className="card"
          whileHover={{ scale: 1.03 }}
          onClick={() =>
            navigate(
              type === "product"
                ? `/product/${item._id}`
                : type === "user"
                ? `/verified-users/${item._id}`
                : `/events/${item._id}`
            )
          }
        >
          <img src={item.image} alt={item.name || item.title} />
          <div className="card-info">
            <h4>{item.name || item.title}</h4>
            {type === "event" && (
              <p>
                Ends in{" "}
                {Math.ceil(
                  (new Date(item.startDate || item.date).getTime() - Date.now()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </Slider>
  </div>
);

export default Home;
