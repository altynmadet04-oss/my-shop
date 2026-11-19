import { useState } from 'react'
import './App.css'

const products = [
  { id: 1, name: 'TAU Hoodie', category: 'Одежда', price: 18000, color: 'burgundy', label: 'BESTSELLER' },
  { id: 2, name: 'TAU T-Shirt', category: 'Одежда', price: 9000, color: 'cream', label: 'NEW' },
  { id: 3, name: 'TAU Shopper', category: 'Аксессуары', price: 5000, color: 'yellow', label: '' },
  { id: 4, name: 'TAU Cap', category: 'Аксессуары', price: 6500, color: 'black', label: 'POPULAR' },
  { id: 5, name: 'TAU Notebook', category: 'Канцелярия', price: 2500, color: 'cream', label: '' },
  { id: 6, name: 'TAU Sweatshirt', category: 'Одежда', price: 15000, color: 'burgundy', label: 'NEW' }
]

function App() {
  const [category, setCategory] = useState('Все')
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([])
  const [favorites, setFavorites] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const categories = ['Все', 'Одежда', 'Аксессуары', 'Канцелярия']

  const filteredProducts = products.filter(product =>
    (category === 'Все' || product.category === category) &&
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function showNotice(message) {
    setNotice(message)
    setTimeout(() => setNotice(''), 2200)
  }

  function addToCart(product) {
    setCart(current => {
      const found = current.find(item => item.id === product.id)
      if (found) {
        return current.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
    showNotice(`${product.name} добавлен в корзину`)
  }

  function changeQuantity(id, amount) {
    setCart(current =>
      current
        .map(item => item.id === id
          ? { ...item, quantity: item.quantity + amount }
          : item
        )
        .filter(item => item.quantity > 0)
    )
  }

  function toggleFavorite(id) {
    setFavorites(current =>
      current.includes(id)
        ? current.filter(item => item !== id)
        : [...current, id]
    )
  }

  return (
    <div className="website">

      <div className="top-banner">
        OFFICIAL TAU UNIVERSITY MERCH STORE ✦ COLLECTION 2026
      </div>

      <header className="header">
        <a href="#" className="logo" aria-label="TAU MERCH">
          <img src="/images/logo.png" alt="TAU MERCH" />
        </a>

        <nav>
          <a href="#">Главная</a>
          <a href="#catalog">Каталог</a>
          <a href="#about">О нас</a>
        </nav>

        <div className="header-actions">
          <button className="icon-button" onClick={() => showNotice(`В избранном: ${favorites.length}`)}>
            ♡ <span>{favorites.length}</span>
          </button>
          <button className="cart-button" onClick={() => setCartOpen(true)}>
            Корзина <span>{totalCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">TAU UNIVERSITY COLLECTION</p>
            <h1>НОСИ СВОЮ<br /><span>ИСТОРИЮ.</span></h1>
            <p className="hero-description">
              Больше чем мерч. Это твоя принадлежность
              к сообществу TAU University.
            </p>
            <a href="#catalog" className="shop-button">
              Открыть коллекцию <span>→</span>
            </a>
            <p className="hero-note">DESIGNED FOR OUR COMMUNITY.</p>
          </div>

          <div className="hero-art">
            <div className="hero-circle"></div>
            <div className="hero-sticker">TAU<br />UNIVERSITY</div>
            <div className="hero-year">EST. 1992</div>
            <div className="hero-star">✳</div>
          </div>
          <div className="hero-index">01 / 03</div>
        </section>

        <div className="ticker">
          <div>TAU UNIVERSITY ✳ WEAR YOUR STORY ✳ BE PART OF TAU ✳ TAU UNIVERSITY ✳ WEAR YOUR STORY ✳</div>
        </div>

        <section className="catalog" id="catalog">
          <div className="section-heading">
            <div>
              <p className="eyebrow">FIND YOUR STYLE</p>
              <h2>Наша коллекция<span>.</span></h2>
            </div>
            <p className="catalog-count">
              {filteredProducts.length} ТОВАРОВ
            </p>
          </div>

          <div className="catalog-tools">
            <div className="filters">
              {categories.map(item => (
                <button
                  key={item}
                  className={category === item ? 'filter active' : 'filter'}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <input
              className="search"
              placeholder="⌕  Поиск товаров..."
              value={search}
              onChange={event => setSearch(event.target.value)}
            />
          </div>

          <div className="products">
            {filteredProducts.map((product, index) => (
              <article className="product" key={product.id}>
                <div className={`product-picture ${product.color}`}>
                  {product.label && <span className="product-label">{product.label}</span>}
                  <button
                    className="favorite"
                    onClick={() => toggleFavorite(product.id)}
                    aria-label="Добавить в избранное"
                  >
                    {favorites.includes(product.id) ? '♥' : '♡'}
                  </button>
                  <div className="mockup">
                    <span>{product.id === 3 ? 'TAU BAG' : product.id === 5 ? 'TAU NOTES' : 'TAU'}</span>
                    <small>{product.id === 3 || product.id === 5 ? 'UNIVERSITY' : 'UNIVERSITY'}</small>
                  </div>
                  <span className="product-number">0{index + 1}</span>
                </div>

                <div className="product-info">
                  <div>
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                  </div>
                  <strong>{product.price.toLocaleString('ru-RU')} ₸</strong>
                </div>

                <button className="add-button" onClick={() => addToCart(product)}>
                  Добавить в корзину <span>+</span>
                </button>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="empty">Товары не найдены. Попробуй другой запрос.</p>
          )}
        </section>

        <section className="about" id="about">
          <p className="eyebrow">MORE THAN MERCH</p>
          <h2>ONE UNIVERSITY.<br />ONE COMMUNITY.</h2>
          <p>Создано для студентов. С любовью к TAU.</p>
        </section>
      </main>

      <footer>
        <div className="logo">
  <img src="/images/logo.png" alt="TAU MERCH" />
</div>  
        <p>© 2026 TAU MERCH — OFFICIAL UNIVERSITY STORE</p>
      </footer>

      {notice && <div className="toast">✓ {notice}</div>}

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="cart-panel" onClick={event => event.stopPropagation()}>
            <div className="cart-heading">
              <h2>Твоя корзина</h2>
              <button onClick={() => setCartOpen(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Пока здесь пусто. Самое время выбрать мерч!</p>
            ) : (
              <>
                {cart.map(item => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <strong>{item.name}</strong>
                      <p>{item.price.toLocaleString('ru-RU')} ₸</p>
                    </div>
                    <div className="quantity">
                      <button onClick={() => changeQuantity(item.id, -1)}>−</button>
                      {item.quantity}
                      <button onClick={() => changeQuantity(item.id, 1)}>+</button>
                    </div>
                  </div>
                ))}
                <div className="cart-total">
                  <span>Итого</span>
                  <strong>{totalPrice.toLocaleString('ru-RU')} ₸</strong>
                </div>
                <button className="checkout" onClick={() => showNotice('Оформление заказа подключим следующим этапом!')}>
                  Оформить заказ →
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App