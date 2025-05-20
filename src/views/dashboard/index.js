import React, { useEffect, memo, Fragment } from "react";
import { Row, Col } from "react-bootstrap";
import Circularprogressbar from "../../components/circularprogressbar.js";
import AOS from "aos";
import "../../../node_modules/aos/dist/aos";
import "../../../node_modules/aos/dist/aos.css";
import Chart from "react-apexcharts";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";
import CountUp from "react-countup";
import { useSelector } from "react-redux";
import * as SettingSelector from "../../store/setting/selectors";

SwiperCore.use([Navigation]);

const Index = memo(() => {
  useSelector(SettingSelector.theme_color);

  const getVariableColor = () => {
    let prefix = getComputedStyle(document.body).getPropertyValue("--prefix") || "bs-";
    prefix = prefix.trim();
    return {
      primary: getComputedStyle(document.body).getPropertyValue(`--${prefix}primary`).trim(),
      info: getComputedStyle(document.body).getPropertyValue(`--${prefix}info`).trim(),
    };
  };

  const variableColors = getVariableColor();
  const colors = [variableColors.primary, variableColors.info];

  useEffect(() => { return () => colors; });

  useEffect(() => {
    AOS.init({
      startEvent: "DOMContentLoaded",
      disable: () => window.innerWidth < 996,
      throttleDelay: 10,
      once: true,
      duration: 700,
      offset: 10,
    });
  }, []);

  const chartTemplate = (title, series, categories) => ({
    options: {
      chart: { toolbar: { show: false }, sparkline: { enabled: false } },
      colors: colors,
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      yaxis: { labels: { style: { colors: "#8A92A6" }, offsetX: -5 } },
      xaxis: { categories: categories, labels: { style: { colors: "#8A92A6" } } },
      legend: { show: false },
      tooltip: { enabled: true },
      fill: {
        type: "gradient",
        gradient: { shade: "dark", type: "vertical", opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 50, 80] }
      },
      grid: { show: false }
    },
    series: series,
  });

  const charts = [
    {
      title: "Accounts",
      chart: chartTemplate("Accounts", [{ name: "Revenue", data: [70, 90, 60, 100, 75] }], ["Jan", "Feb", "Mar", "Apr", "May"]),
    },
    {
      title: "Leave",
      chart: chartTemplate("Leave", [{ name: "Requests", data: [20, 25, 15, 30, 22] }], ["Jan", "Feb", "Mar", "Apr", "May"]),
    },
    {
      title: "Assets",
      chart: chartTemplate("Assets", [{ name: "Assets", data: [50, 60, 55, 70, 65] }], ["Jan", "Feb", "Mar", "Apr", "May"]),
    },
    {
      title: "Training / Skills",
      chart: chartTemplate("Training", [{ name: "Sessions", data: [5, 15, 10, 20, 25] }], ["Jan", "Feb", "Mar", "Apr", "May"]),
    },
    {
      title: "Purchases",
      chart: chartTemplate("Purchases", [{ name: "Orders", data: [10, 20, 15, 25, 30] }], ["Jan", "Feb", "Mar", "Apr", "May"]),
    }
  ];

  const counters = [
    { label: "Accounts", value: 560 },
    { label: "Leave Requests", value: 115 },
    { label: "Assets", value: 378 },
    { label: "Skills/Training", value: 742 },
    { label: "Purchases", value: 150 },
  ];

  return (
    <Fragment>
      <Row>
        <Col md="12">
          <div className="overflow-hidden d-slider1" data-aos="fade-up">
              <br />
            <Swiper
              className="p-0 m-0 mb-2 list-inline"
              slidesPerView={5}
              spaceBetween={32}
              navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
              breakpoints={{
                320: { slidesPerView: 1 },
                550: { slidesPerView: 2 },
                991: { slidesPerView: 3 },
                1400: { slidesPerView: 3 },
                1500: { slidesPerView: 4 },
                1920: { slidesPerView: 4 },
                2040: { slidesPerView: 5 },
              }}
            >
              {counters.map((counter, idx) => (
                <SwiperSlide key={idx} className="card card-slide">
                  <div className="card-body">
                    <div className="progress-widget">
                      <Circularprogressbar
                        stroke={colors[idx % colors.length]}
                        width="60px"
                        height="60px"
                        trailstroke="#ddd"
                        strokewidth="4px"
                        Linecap="rounded"
                        style={{ width: 60, height: 60 }}
                        value={Math.min((counter.value / 1000) * 100, 100)}
                        id={`circle-progress-${idx}`}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M5,17.59L15.59,7H9V5H19V15H17V8.41L6.41,19L5,17.59Z"
                          />
                        </svg>
                      </Circularprogressbar>
                      <div className="progress-detail">
                        <p className="mb-2">{counter.label}</p>
                        <h4 className="counter">
                          <CountUp start={0} end={counter.value} duration={2} />
                        </h4>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="swiper-button swiper-button-next"></div>
              <div className="swiper-button swiper-button-prev"></div>
            </Swiper>
          </div>
        </Col>

        {charts.map((module, idx) => (
          <Col md="6" key={idx} className="mb-4">
            <div className="card" data-aos="fade-up">
              <div className="card-header">
                <h5 className="card-title mb-0">{module.title} Chart</h5>
              </div>
              <div className="card-body">
                <Chart options={module.chart.options} series={module.chart.series} type="line" height={250} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Fragment>
  );
});

export default Index;
