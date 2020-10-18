import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import './mainPage.css';

import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import { InputLabel } from '@material-ui/core';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import GridLayout from 'react-grid-layout';
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const MainPage = () => {

  const search_options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const doctors_slider = {
    rows: 2,
    slidesPerRow: 4,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    // className: "center",
    // centerMode: true,
    // centerPadding: "60px",
  };

  const clinics_slider = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2
  };

  const [values, setValues] = React.useState({
    textmask: '',
    numberformat: '1320',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Header />

      <section className="intro">
        <div className="intro_1">
          <svg width="73" height="68" viewBox="0 0 73 68" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0)">
              <path d="M26.0865 0C15.7263 0.0737438 7.37968 8.51782 7.42597 18.8784C7.42597 29.0174 24.696 50.762 25.431 51.685C25.5903 51.8841 25.8316 52.0001 26.0865 52.0001C26.3413 52.0001 26.5826 51.8841 26.7416 51.685C27.4765 50.762 44.7465 29.0157 44.7465 18.8784C44.7932 8.51782 36.4467 0.0737438 26.0865 0ZM26.0865 49.7939C22.888 45.6638 9.10406 27.3663 9.10406 18.8784C9.01802 12.7544 12.2361 7.05851 17.5256 3.97111C22.8155 0.884107 29.3574 0.884107 34.6473 3.97111C39.9368 7.05851 43.1549 12.7544 43.0685 18.8784C43.0685 27.3663 29.2849 45.6638 26.0865 49.7939Z" fill="#00C6DD"/>
              <path d="M26.0864 5.87329C19.599 5.87329 14.3398 11.1325 14.3398 17.6199C14.3398 24.1073 19.599 29.3665 26.0864 29.3665C32.5738 29.3665 37.833 24.1073 37.833 17.6199C37.826 11.1353 32.571 5.88026 26.0864 5.87329ZM26.0864 27.6884C20.5257 27.6884 16.0179 23.1806 16.0179 17.6199C16.0179 12.0592 20.5257 7.55138 26.0864 7.55138C31.6471 7.55138 36.1549 12.0592 36.1549 17.6199C36.1488 23.1781 31.6447 27.6822 26.0864 27.6884Z" fill="#00C6DD"/>
            </g>
            <g clip-path="url(#clip1)">
              <path d="M48.0836 18C38.1219 18.0709 30.0963 26.1902 30.1408 36.1523C30.1408 45.9013 46.7466 66.8096 47.4533 67.6971C47.6065 67.8886 47.8386 68.0001 48.0836 68.0001C48.3286 68.0001 48.5606 67.8886 48.7135 67.6971C49.4202 66.8096 66.026 45.8998 66.026 36.1523C66.0709 26.1902 58.0453 18.0709 48.0836 18ZM48.0836 65.8787C45.0082 61.9075 31.7544 44.3138 31.7544 36.1523C31.6716 30.2639 34.766 24.787 39.852 21.8184C44.9384 18.8501 51.2287 18.8501 56.3152 21.8184C61.4012 24.787 64.4955 30.2639 64.4124 36.1523C64.4124 44.3138 51.159 61.9075 48.0836 65.8787Z" fill="#C4C4C4"/>
              <path d="M48.0839 23.6474C41.846 23.6474 36.7891 28.7043 36.7891 34.9422C36.7891 41.1801 41.846 46.237 48.0839 46.237C54.3218 46.237 59.3786 41.1801 59.3786 34.9422C59.3719 28.7071 54.319 23.6541 48.0839 23.6474ZM48.0839 44.6235C42.737 44.6235 38.4026 40.289 38.4026 34.9422C38.4026 29.5954 42.737 25.2609 48.0839 25.2609C53.4307 25.2609 57.7651 29.5954 57.7651 34.9422C57.7592 40.2867 53.4283 44.6175 48.0839 44.6235Z" fill="#C4C4C4"/>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="52" height="52" fill="white"/>
              </clipPath>
              <clipPath id="clip1">
                <rect width="50" height="50" fill="white" transform="translate(23 18)"/>
              </clipPath>
            </defs>
          </svg>
          <div className="intro_1_text">
            <p>Поиск врача рядом с вами</p>
            <p>Просто укажите радиус и выбирайте</p>
          </div>
        </div>
        <div className="intro_2">
          <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M62.4619 38.9695H56.8164C57.3919 40.545 57.7062 42.2453 57.7062 44.0174V65.3542C57.7062 66.0931 57.5776 66.8023 57.3437 67.4618H66.677C70.1634 67.4618 72.9997 64.6254 72.9997 61.1391V49.5074C72.9999 43.6969 68.2726 38.9695 62.4619 38.9695Z" fill="#00C6DD"/>
            <path d="M15.2937 44.0175C15.2937 42.2453 15.6081 40.5452 16.1835 38.9697H10.538C4.72733 38.9697 0 43.697 0 49.5076V61.1393C0 64.6256 2.83631 67.4621 6.32278 67.4621H15.6562C15.4223 66.8022 15.2937 66.0932 15.2937 65.3544V44.0175Z" fill="#00C6DD"/>
            <path d="M42.9532 33.4796H30.0468C24.2361 33.4796 19.5088 38.2069 19.5088 44.0175V65.3544C19.5088 66.5182 20.4524 67.462 21.6164 67.462H51.3836C52.5476 67.462 53.4912 66.5184 53.4912 65.3544V44.0175C53.4912 38.2069 48.7639 33.4796 42.9532 33.4796Z" fill="#00C6DD"/>
            <path d="M36.5004 5.53772C29.5123 5.53772 23.8271 11.2229 23.8271 18.2111C23.8271 22.9511 26.4433 27.0909 30.3069 29.2643C32.1395 30.2952 34.2522 30.8843 36.5004 30.8843C38.7485 30.8843 40.8613 30.2952 42.6938 29.2643C46.5576 27.0909 49.1736 22.951 49.1736 18.2111C49.1736 11.223 43.4884 5.53772 36.5004 5.53772Z" fill="#C4C4C4"/>
            <path d="M14.2455 17.3502C9.01927 17.3502 4.76758 21.6019 4.76758 26.8281C4.76758 32.0543 9.01927 36.306 14.2455 36.306C15.5712 36.306 16.8336 36.0314 17.9803 35.5378C19.963 34.6842 21.5978 33.1731 22.6094 31.2804C23.3195 29.952 23.7234 28.4365 23.7234 26.8281C23.7234 21.6021 19.4717 17.3502 14.2455 17.3502Z" fill="#C4C4C4"/>
            <path d="M58.7543 17.3502C53.5281 17.3502 49.2764 21.6019 49.2764 26.8281C49.2764 28.4367 49.6803 29.9522 50.3903 31.2804C51.4019 33.1733 53.0367 34.6843 55.0194 35.5378C56.1662 36.0314 57.4286 36.306 58.7543 36.306C63.9805 36.306 68.2322 32.0543 68.2322 26.8281C68.2322 21.6019 63.9805 17.3502 58.7543 17.3502Z" fill="#C4C4C4"/>
          </svg>
          <div className="intro_2_text">
            <p>Поиск врача рядом с вами</p>
            <p>Просто укажите радиус и выбирайте</p>
          </div>
        </div>
        <div className="intro_3">
          <svg width="73" height="73" viewBox="0 0 73 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.0153 18.25C19.3651 18.25 18.8379 17.7052 18.8379 17.0333C18.8379 16.3614 19.3651 15.8166 20.0153 15.8166C21.3137 15.8166 22.3701 14.725 22.3701 13.3833V10.95C22.3701 9.6083 21.3137 8.51665 20.0153 8.51665C19.3651 8.51665 18.8379 7.97188 18.8379 7.29998C18.8379 6.62808 19.3651 6.08331 20.0153 6.08331C22.6123 6.08331 24.725 8.26647 24.725 10.95V13.3833C24.725 16.0668 22.6123 18.25 20.0153 18.25Z" fill="#463C4B"/>
            <path d="M33.4565 21.1872L24.2393 11.6626C23.7977 11.2062 23.1987 10.9498 22.5741 10.9498H19.8153C19.1908 10.9498 18.5918 11.2062 18.1501 11.6626L8.93284 21.1872C8.4913 21.6436 8.24316 22.2624 8.24316 22.9077V47.45C8.24316 48.7939 9.29754 49.8833 10.598 49.8833H31.7915C33.092 49.8833 34.1464 48.7939 34.1464 47.45V22.9078C34.1462 22.2625 33.8981 21.6436 33.4565 21.1872Z" fill="#00C6DD"/>
            <path d="M8.24219 22.9087V47.4508C8.24219 48.7948 9.29642 49.8841 10.597 49.8841H29.4357C30.7363 49.8841 31.7906 48.7948 31.7906 47.4508V22.9087C31.7906 22.2634 31.5424 21.6444 31.1009 21.188L21.8836 11.6635C21.4419 11.2071 20.8431 10.9508 20.2184 10.9508H19.8144C19.19 10.9508 18.591 11.2072 18.1493 11.6635L8.93201 21.188C8.49033 21.6444 8.24219 22.2634 8.24219 22.9087Z" fill="#E6E6EB"/>
            <path d="M20.0166 20.6833C21.9674 20.6833 23.5489 19.0491 23.5489 17.0333C23.5489 15.0175 21.9674 13.3833 20.0166 13.3833C18.0658 13.3833 16.4844 15.0175 16.4844 17.0333C16.4844 19.0491 18.0658 20.6833 20.0166 20.6833Z" fill="#00C6DD"/>
            <path d="M24.7257 32.85C25.3759 32.85 25.9031 32.3052 25.9031 31.6333V31.3994C25.9031 28.8449 23.8919 26.7666 21.4198 26.7666H21.1934V24.3333C21.1934 23.6614 20.6662 23.1166 20.016 23.1166C19.3658 23.1166 18.8386 23.6614 18.8386 24.3333V26.7666H18.6122C16.1401 26.7666 14.1289 28.8449 14.1289 31.3994C14.1289 33.5292 15.5253 35.3773 17.5249 35.8939L21.9359 37.0333C22.8852 37.2786 23.5483 38.1562 23.5483 39.1672C23.5483 40.3801 22.5935 41.3666 21.4198 41.3666H18.6122C17.4385 41.3666 16.4837 40.3801 16.4837 39.1672V38.9333C16.4837 38.2614 15.9566 37.7166 15.3063 37.7166C14.6561 37.7166 14.1289 38.2614 14.1289 38.9333V39.1672C14.1289 41.7218 16.1401 43.8 18.6122 43.8H18.8386V46.2333C18.8386 46.9052 19.3658 47.45 20.016 47.45C20.6662 47.45 21.1934 46.9052 21.1934 46.2333V43.8H21.4198C23.8919 43.8 25.9031 41.7218 25.9031 39.1672C25.9031 37.0374 24.5067 35.1893 22.5071 34.6727L18.0961 33.5333C17.1468 33.288 16.4837 32.4105 16.4837 31.3994C16.4837 30.1865 17.4385 29.2 18.6122 29.2H21.4198C22.5935 29.2 23.5483 30.1865 23.5483 31.3994V31.6333C23.5483 32.3052 24.0754 32.85 24.7257 32.85Z" fill="#EAF9FF"/>
            <path d="M54.1616 62.05H40.0326C38.732 62.05 37.6777 63.1394 37.6777 64.4834V73H56.5164V64.4834C56.5164 63.1394 55.4622 62.05 54.1616 62.05Z" fill="#463C4B"/>
            <path d="M56.516 64.4833H49.4515C48.1509 64.4833 47.0967 65.5727 47.0967 66.9167V73H56.516V64.4833Z" fill="#32283C"/>
            <path d="M55.3387 46.2333H47.0967C43.1951 46.2333 40.0322 49.5016 40.0322 53.5333V62.05H47.0967V55.9667C47.0967 54.6227 48.151 53.5333 49.4516 53.5333H55.3387C57.2895 53.5333 58.8709 51.8992 58.8709 49.8833C58.8709 47.8675 57.2895 46.2333 55.3387 46.2333Z" fill="#FAB991"/>
            <path d="M72.3101 44.5128C71.3905 43.5626 69.8995 43.5626 68.9799 44.5128L60.2504 53.5334H49.4515C48.1511 53.5334 47.0967 54.6227 47.0967 55.9667V62.05H54.1612V60.8334C54.1612 59.4894 55.2156 58.4 56.516 58.4H60.7381C61.6815 58.4 62.5687 58.0204 63.2357 57.331L72.3102 47.954C73.2299 47.0037 73.2299 45.4631 72.3101 44.5128Z" fill="#F0915A"/>
            <path d="M55.3393 51.9111H54.5544C53.9041 51.9111 53.377 51.3663 53.377 50.6944V49.0721C53.377 48.4002 53.9041 47.8555 54.5544 47.8555H55.3393C56.4231 47.8555 57.3016 48.7634 57.3016 49.8832C57.3016 51.0033 56.4231 51.9111 55.3393 51.9111Z" fill="#F0915A"/>
            <path d="M32.9682 68.1334H18.8392C17.5386 68.1334 16.4844 69.2227 16.4844 70.5667V73H35.3231V70.5667C35.3231 69.2227 34.2688 68.1334 32.9682 68.1334Z" fill="#463C4B"/>
            <path d="M35.3227 70.5667H28.2582C26.9576 70.5667 25.9033 71.6561 25.9033 73H35.3227V70.5667Z" fill="#32283C"/>
            <path d="M17.6612 52.3167H25.9031C29.8048 52.3167 32.9676 55.585 32.9676 59.6167H17.6612C15.7103 59.6167 14.1289 57.9826 14.1289 55.9667C14.1289 53.9508 15.7103 52.3167 17.6612 52.3167Z" fill="#FAB991"/>
            <path d="M17.6615 57.9944H18.4464C19.0967 57.9944 19.6238 57.4496 19.6238 56.7777V55.1554C19.6238 54.4835 19.0967 53.9388 18.4464 53.9388H17.6615C16.5777 53.9388 15.6992 54.8467 15.6992 55.9665C15.6992 57.0866 16.5777 57.9944 17.6615 57.9944Z" fill="#F0915A"/>
            <path d="M12.7495 59.6167L4.01996 50.5961C3.1004 49.6459 1.60935 49.6459 0.689783 50.5961C-0.229928 51.5464 -0.229928 53.0871 0.689783 54.0373L9.76429 63.4143C10.4313 64.1037 11.3185 64.4833 12.2619 64.4833H16.4838C17.7843 64.4833 18.8387 65.5727 18.8387 66.9167V68.1333H32.9677V59.6167H12.7495Z" fill="#F0915A"/>
            <path d="M16.4844 64.4833C17.7848 64.4833 18.8392 65.5727 18.8392 66.9167V68.1333H25.9037V66.9167C25.9037 65.5727 24.8495 64.4833 23.5489 64.4833H16.4844Z" fill="#FAB991"/>
            <path d="M20.0163 18.25C17.4194 18.25 15.3066 16.0668 15.3066 13.3833V10.95C15.3066 8.26647 17.4194 6.08331 20.0163 6.08331C20.6665 6.08331 21.1937 6.62808 21.1937 7.29998C21.1937 7.97188 20.6665 8.51665 20.0163 8.51665C18.7179 8.51665 17.6615 9.6083 17.6615 10.95V13.3833C17.6615 14.725 18.7179 15.8166 20.0163 15.8166C20.6665 15.8166 21.1937 16.3614 21.1937 17.0333C21.1937 17.7052 20.6665 18.25 20.0163 18.25Z" fill="#463C4B"/>
            <path d="M50.6286 12.1667C49.9784 12.1667 49.4512 11.6219 49.4512 10.95C49.4512 10.2781 49.9784 9.73333 50.6286 9.73333C51.927 9.73333 52.9834 8.64168 52.9834 7.3V4.86667C52.9834 3.52499 51.927 2.43333 50.6286 2.43333C49.9784 2.43333 49.4512 1.88857 49.4512 1.21667C49.4512 0.544762 49.9784 0 50.6286 0C53.2255 0 55.3383 2.18316 55.3383 4.86667V7.3C55.3383 9.98351 53.2255 12.1667 50.6286 12.1667Z" fill="#463C4B"/>
            <path d="M64.0689 15.1039L54.8516 5.57933C54.4101 5.12293 53.811 4.86652 53.1864 4.86652H50.4276C49.8031 4.86652 49.2041 5.12293 48.7624 5.57933L39.5451 15.1039C39.1036 15.5603 38.8555 16.1791 38.8555 16.8244V41.3667C38.8555 42.7106 39.9098 43.8 41.2103 43.8H62.4038C63.7043 43.8 64.7587 42.7106 64.7587 41.3667V16.8245C64.7585 16.1792 64.5104 15.5603 64.0689 15.1039Z" fill="#E5E5E5"/>
            <path d="M38.8555 16.8253V41.3675C38.8555 42.7115 39.9097 43.8008 41.2103 43.8008H60.049C61.3496 43.8008 62.4038 42.7115 62.4038 41.3675V16.8253C62.4038 16.1801 62.1557 15.5611 61.7142 15.1047L52.4969 5.58016C52.0552 5.12375 51.4563 4.86749 50.8317 4.86749H50.4277C49.8033 4.86749 49.2042 5.12391 48.7626 5.58016L39.5453 15.1047C39.1036 15.5611 38.8555 16.1801 38.8555 16.8253Z" fill="#00C6DD"/>
            <path d="M50.6299 14.6C52.5807 14.6 54.1622 12.9658 54.1622 10.95C54.1622 8.93415 52.5807 7.29999 50.6299 7.29999C48.6791 7.29999 47.0977 8.93415 47.0977 10.95C47.0977 12.9658 48.6791 14.6 50.6299 14.6Z" fill="#E5E5E5"/>
            <path d="M55.339 26.7667C55.9892 26.7667 56.5164 26.2219 56.5164 25.55V25.3161C56.5164 22.7615 54.5052 20.6833 52.0331 20.6833H51.8067V18.25C51.8067 17.5781 51.2795 17.0333 50.6293 17.0333C49.9791 17.0333 49.4519 17.5781 49.4519 18.25V20.6833H49.2255C46.7534 20.6833 44.7422 22.7615 44.7422 25.3161C44.7422 27.4459 46.1386 29.294 48.1382 29.8106L52.5492 30.95C53.4985 31.1953 54.1615 32.0728 54.1615 33.0839C54.1615 34.2968 53.2068 35.2833 52.0331 35.2833H49.2255C48.0518 35.2833 47.097 34.2968 47.097 33.0839V32.85C47.097 32.1781 46.5698 31.6333 45.9196 31.6333C45.2694 31.6333 44.7422 32.1781 44.7422 32.85V33.0839C44.7422 35.6384 46.7534 37.7167 49.2255 37.7167H49.4519V40.15C49.4519 40.8219 49.9791 41.3667 50.6293 41.3667C51.2795 41.3667 51.8067 40.8219 51.8067 40.15V37.7167H52.0331C54.5052 37.7167 56.5164 35.6384 56.5164 33.0839C56.5164 30.9541 55.12 29.106 53.1204 28.5894L48.7093 27.45C47.7601 27.2047 47.097 26.3271 47.097 25.3161C47.097 24.1032 48.0518 23.1167 49.2255 23.1167H52.0331C53.2068 23.1167 54.1615 24.1032 54.1615 25.3161V25.55C54.1615 26.2219 54.6887 26.7667 55.339 26.7667Z" fill="#EAF9FF"/>
            <path d="M50.6286 12.1667C48.0317 12.1667 45.9189 9.98351 45.9189 7.3V4.86667C45.9189 2.18316 48.0317 0 50.6286 0C51.2788 0 51.806 0.544762 51.806 1.21667C51.806 1.88857 51.2788 2.43333 50.6286 2.43333C49.3302 2.43333 48.2738 3.52499 48.2738 4.86667V7.3C48.2738 8.64168 49.3302 9.73333 50.6286 9.73333C51.2788 9.73333 51.806 10.2781 51.806 10.95C51.806 11.6219 51.2788 12.1667 50.6286 12.1667Z" fill="#463C4B"/>
          </svg>
          <div className="intro_3_text">
            <p>Поиск врача рядом с вами</p>
            <p>Просто укажите радиус и выбирайте</p>
          </div>
        </div>
      </section>

      <section className="search">
        
        <p id="search_title1">Запишитесь на приём к врачу онлайн</p>
        <div className="search_group">
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: 390 }}
            renderInput={(params) => <TextField {...params} label="Врач, специальность" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: 390 }}
            renderInput={(params) => <TextField {...params} label="Город, район" variant="outlined" />}
          />
          <Autocomplete
            id="grouped-demo"
            options={search_options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            style={{ width: 217 }}
            renderInput={(params) => <TextField {...params} label="Радиус" variant="outlined" />}
          />
          <Link to="/search"><button id="search_button">Найти</button></Link>
        </div>
      </section>

      <section className="doctors">
        <p id="doctors_title">Популярные специализации</p>
        <Slider {...doctors_slider}>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
          <div id="doctors_slide">
            <div id="doctors_slide_icon"></div>
            <h3>Кардиолог</h3>
          </div>
        </Slider>
      </section>

      <section className="clinics">
        <p id="clinics_title">Клиники</p>
        <Slider {...clinics_slider}>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
          <div id="clinics_slide">
            <div id="clinics_slide_left">
              <img src={require('../../content/images/main/70e4b3c1bd7d70589e857693212fb33c1.png')} alt="clinic pic"/>
            </div>    
            <div id="clinics_slide_right">
              <Link to="/clinic"><h3>МЕДИЦИНСКИЙ ЦЕНТР MEDCENTER.KG</h3></Link>
              <p id="clinics_slide_right_article">MEDCENTER.KG имеет новейшее техническоеоборудование, которое позволяет проводитьвесь спектр эндоскопических, пластических и хирургических вмешательств.</p>
              <div id="clinics_slide_right_comments">
                <img src={require('../../content/images/main/kisspng-physician-hospital-dr-mary-c-kirk-md-doctor-of-the-doctor-5ac2fc7fa9d6a91.svg')} alt="comment icon"/>
                <p>20 врачей</p>
              </div>
            </div>
          </div>
        </Slider>
      </section>

      <section className="specialties">
        <p id="specialties_title">Все специальности</p>
        <GridLayout className="layout" cols={4} rowHeight={40} width={document.documentElement.clientWidth-190}>

          <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">А</div>
              <span>Акушерство</span>
              <span>Аллергология</span>
              <span>Андрология</span>
              <span>Анестезиология</span>
              <span>Аритмология</span>
              <span>Артрология</span>
            </div>
          </div>

          <div key="b" data-grid={{x: 1, y: 0, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">В</div>
              <span>Венерология</span>
              <span>Вертебрология</span>
            </div>
          </div>

          <div key="c" data-grid={{x: 2, y: 0, w: 1, h: 5, minH: 2, maxH: 5}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Г</div>
              <span>Гастроэнтерология</span>
              <span>Гематология</span>
              <span>Генетика</span>
              <span>Гепатология</span>
              <span>Гинекология</span>
              <span>Гинекология-эндокринология</span>
              <span>Гирудотерапия</span>
              <span>Гомеопатия</span>
            </div>
          </div>

          <div key="d" data-grid={{x: 3, y: 0, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Д</div>
              <span>Дерматология</span>
              <span>Дерматоонкология</span>
              <span>Дефектология</span>
              <span>Диабетология</span>
              <span>Диетология</span>
              <span>Дневной стационар</span>
            </div>
          </div>

          <div key="e" data-grid={{x: 0, y: 1, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">И</div>
              <span>Иммунология</span>
              <span>Инфектология</span>
            </div>
          </div>

          <div key="f" data-grid={{x: 1, y: 1, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">К</div>
              <span>Кардиология</span>
              <span>Кардиохирургия</span>
              <span>Кинезитерапия</span>
              <span>Колопроктология</span>
              <span>Косметология</span>
              <span>КТ</span>
            </div>
          </div>

          <div key="g" data-grid={{x: 2, y: 1, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Л</div>
              <span>Лечебная физкультура</span>
              <span>Логопедия</span>
            </div>
          </div>

          <div key="h" data-grid={{x: 3, y: 1, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">М</div>
              <span>Маммология</span>
              <span>Мануальная терапия</span>
              <span>Массаж</span>
              <span>Микрохирургия</span>
              <span>МРТ</span>
            </div>
          </div>

          <div key="i" data-grid={{x: 0, y: 2, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Н</div>
              <span>Наркология</span>
              <span>Неврология</span>
              <span>Нейрохирургия</span>
              <span>Неонатология</span>
              <span>Нетрадиционная медицина</span>
              <span>Нефрология</span>
            </div>
          </div>

          <div key="j" data-grid={{x: 1, y: 2, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">О</div>
              <span>Онкология</span>
              <span>Ортодонтия</span>
              <span>Ортопедия</span>
              <span>Остеопатия</span>
              <span>Офтальмология</span>
            </div>
          </div>

          <div key="k" data-grid={{x: 2, y: 2, w: 1, h: 5, minH: 2, maxH: 5}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">П</div>
              <span>Педиатрия</span>
              <span>Пластическая хирургия</span>
              <span>Подология</span>
              <span>Проктология</span>
              <span>Психиатрия</span>
              <span>Психология</span>
              <span>Психотерапия</span>
              <span>Пульмонология</span>
            </div>
          </div>

          <div key="l" data-grid={{x: 3, y: 2, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Р</div>
              <span>Радиология</span>
              <span>Реабилитология</span>
              <span>Ревматология</span>
              <span>Рентгенология</span>
              <span>Репродуктология</span>
              <span>Рефлексотерапия</span>
            </div>
          </div>

          <div key="m" data-grid={{x: 0, y: 3, w: 1, h: 5, minH: 2, maxH: 5}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">С</div>
              <span>Сексология</span>
              <span>Сексопатология</span>
              <span>Семейная медицина</span>
              <span>Скорая медицинская помощь</span>
              <span>Стационар</span>
              <span>Стоматология</span>
              <span>Сурдология</span>
            </div>
          </div>

          <div key="n" data-grid={{x: 1, y: 3, w: 1, h: 3, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Т</div>
              <span>Терапия</span>
              <span>Травматология</span>
              <span>Трихология</span>
            </div>
          </div>

          <div key="o" data-grid={{x: 2, y: 3, w: 1, h: 2, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">У</div>
              <span>УЗ - диагностика</span>
              <span>Урология</span>
            </div>
          </div>

          <div key="p" data-grid={{x: 3, y: 3, w: 1, h: 4, minH: 2, maxH: 4}}>
            
            <div className="specialties_col_list">
              <div id="specialties_col_title">Ф</div>
              <span>Физиотерапия</span>
              <span>Фитотерапия</span>
              <span>Флебология</span>
              <span>Фтизиатрия</span>
              <span>Функциональная диагностика</span>
            </div>
          </div>

        </GridLayout>
      </section>

      <div id="specialties_show_btn">Все 85 специальностей</div>

      <section className="contact_us">
        <div className="contact_us_left">
          <p id="contact_us_title">Не нашли подходящего врача?</p>
          <p id="contact_us_number">Свяжитесь с нами +996 555 55 55 55 или оставьте номер</p>
          <div id="contact_us_input">
            <FormControl>
              <InputLabel htmlFor="formatted-text-mask-input"></InputLabel>
              <Input
                value={values.textmask}
                onChange={handleChange}
                name="textmask"
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </FormControl>
            <button id="contact_us_button">Позвоните мне</button>
          </div>
        </div>
        <img id="contact_us_right" src={require('../../content/images/main/hotpng_2.png')} alt="doc female"/>
      </section>

      <Footer />
    </>
  )
}

export default MainPage

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['+','9', '9', '6','(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];