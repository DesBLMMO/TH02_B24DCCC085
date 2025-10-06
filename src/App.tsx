// src/App.tsx
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Bai1, { ChiTietQuocGia } from "./components/Bai1";
import Bai2 from "./components/Bai2";
import Bai3, { ChiTietPhim } from "./components/Bai3";

function Home() {
  return (
    <div className="card home-card">
      <h1 className="home-title">Bài thực hành 02:</h1>

      <ul className="dash">
        <li>
          Mục tiêu: Áp dụng các kiến thức liên quan đến React trong lập trình web: Props, State,
          Lifecycle, Axios, Typescript, React-Router
        </li>
        <li>
          Thời gian làm bài thử: 13h15 đến 16h45, sinh viên tạo repo trên Github, đặt tên là TH02_Mã sinh viên,
          vd: TH02_B24DCCC014
        </li>
        <li>
          Sinh viên push code lên github và add thầy vào repo (tài khoản github: <strong>thanhpq@ptit.edu.vn</strong>)
        </li>
      </ul>

      <h3>Bài 1: Ứng dụng Tra cứu Quốc gia</h3>
      <ul className="dash">
        <li>
          Sinh viên sử dụng axios để lấy dữ liệu qua địa chỉ
          {" "}
          <a href="https://restcountries.com/v3.1/all?fields=name,flags,population,region" target="_blank" rel="noreferrer">
            https://restcountries.com/v3.1/all?fields=name,flags,population,region
          </a>
        </li>
        <li>
          Hiển thị danh sách quốc gia gồm các thông tin (quốc kì, tên, dân số, khu vực)
        </li>
        <li>Có ô tìm kiếm theo tên quốc gia</li>
        <li>Khi click vào 1 quốc gia thì hiển thị chi tiết (dùng React Router).</li>
      </ul>

      <h3>Bài 2: Quy đổi tỉ giá tiền tệ</h3>
      <ul className="dash">
        <li>
          Sinh viên sử dụng axios để lấy dữ liệu qua địa chỉ
          {" "}
          <a href="https://open.er-api.com/v6/latest/baseCurrency" target="_blank" rel="noreferrer">
            https://open.er-api.com/v6/latest/baseCurrency
          </a>, trong đó <strong>baseCurrency</strong> là đơn vị tiền tệ gốc muốn quy đổi.
        </li>
        <li>
          VD khi muốn quy đổi từ USD sang các loại tiền tệ khác thì gọi tới địa chỉ:
          {" "}
          <a href="https://open.er-api.com/v6/latest/USD" target="_blank" rel="noreferrer">
            https://open.er-api.com/v6/latest/USD
          </a>
        </li>
      </ul>

      <h3>Bài 3: Ứng dụng tìm kiếm phim</h3>
      <ul className="dash">
        <li>
          Sinh viên sử dụng axios để lấy dữ liệu qua địa chỉ
          {" "}
          <a href="https://www.omdbapi.com/?apikey=thewdb&s=search" target="_blank" rel="noreferrer">
            https://www.omdbapi.com/?apikey=thewdb&s=search
          </a>, trong đó <strong>search</strong> là tên phim do người dùng nhập vào, dữ liệu nhận được sẽ có một số thông tin như tên, poster, năm phát hành, <strong>imdbID</strong> của phim.
        </li>
        <li>
          Khi click vào 1 phim thì hiển thị thông tin chi tiết của phim (Dùng React Router và axios để lấy thông tin chi tiết của phim qua địa chỉ
          {" "}
          <a href="https://www.omdbapi.com/?apikey=thewdb&i=imdbID&plot=full" target="_blank" rel="noreferrer">
            https://www.omdbapi.com/?apikey=thewdb&i=imdbID&plot=full
          </a>
          {" "}trong đó <strong>imdbID</strong> lấy từ thông tin phim)
        </li>
      </ul>

      <h3>Yêu cầu:</h3>
      <p className="home-require">Toàn bộ bài sử dụng <strong>TypeScript</strong>, bắt buộc sử dụng các thư viện: <strong>axios</strong>, <strong>react-router-dom</strong>; cả 3 bài trong cùng 1 project, mỗi bài là một component.</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="layout">
      <nav className="topnav">
        <Link to="/">Trang chủ</Link>
        <Link to="/bai1">Bài 1</Link>
        <Link to="/bai2">Bài 2</Link>
        <Link to="/bai3">Bài 3</Link>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bai1" element={<Bai1 />} />
          <Route path="/bai1/:name" element={<ChiTietQuocGia />} />
          <Route path="/bai2" element={<Bai2 />} />
          <Route path="/bai3" element={<Bai3 />} />
          <Route path="/bai3/:id" element={<ChiTietPhim />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

