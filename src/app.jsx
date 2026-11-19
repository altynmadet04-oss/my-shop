import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home-temp";
import "./App.css";

function Header() {
  return (
    <header className="site-header">
    <Link to="/" className="site-logo">
  <img src="/images/logo.png" alt="TAU MERCH" />
</Link>

      <nav className="site-nav">
        <Link to="/">Главная</Link>
        <Link to="/catalog">Каталог</Link>
        <Link to="/about">О нас</Link>
        <Link to="/contacts">Контакты</Link>
        <Link to="/cart">Корзина</Link>
      </nav>
    </header>
  );
}

function Catalog() {
  return <main className="page">
    <h1>Каталог TAU MERCH</h1>
    <p>Здесь будут все товары университета.</p>
  </main>;
}

function About() {
  return <main className="page">
    <h1>О нас</h1>
    <p>TAU MERCH — университетский мерч для студентов и выпускников.</p>
  </main>;
}

function Contacts() {
  return <main className="page">
    <h1>Контакты</h1>
    <p>Свяжитесь с нами по вопросам заказа.</p>
  </main>;
}

function Cart() {
  return <main className="page">
    <h1>Корзина</h1>
    <p>Здесь будут выбранные товары.</p>
  </main>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}