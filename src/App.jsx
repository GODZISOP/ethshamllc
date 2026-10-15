import React, { useState, useEffect } from 'react';
import { 
  Phone, Mail, MapPin, Search, ArrowRight, CheckCircle2, 
  Send, ExternalLink, ShieldCheck, Truck, Award,
  X, MessageSquare, Layers, Building2, ShoppingCart, Menu as MenuIcon,
  Plus, Minus, Trash2, ShoppingBag, Eye, ArrowLeft, Check,
  LayoutGrid, Sparkles, ChevronDown, Package, Star, Calendar, Clock
} from 'lucide-react';
import { companyInfo, categories, products } from './data/products';
import logoImg from './images/ehthesham-logo.svg';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [modalType, setModalType] = useState(null); // 'partner', 'quote', 'checkout', null
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Cart & Product Detail state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ehthesham_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [detailQuantity, setDetailQuantity] = useState(1);
  const [activeDetailTab, setActiveDetailTab] = useState('description');
  const [toastMessage, setToastMessage] = useState(null);

  // Contact form specific state
  const [contactDate, setContactDate] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('ehthesham_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Filter & sort products
  const filteredProducts = products.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.priceNumeric - b.priceNumeric;
    if (sortBy === 'price-high') return b.priceNumeric - a.priceNumeric;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'latest') return b.id - a.id;
    return 0;
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, qty = 1, openDrawer = true) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    showToast(`Added ${qty}x ${product.name} to cart!`);
    if (openDrawer) {
      setCartOpen(true);
    }
  };

  const updateCartQuantity = (productId, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.priceNumeric * item.quantity), 0);

  const viewProductDetail = (product) => {
    setActiveProduct(product);
    setDetailQuantity(1);
    setActiveDetailTab('description');
    setActiveTab('product-detail');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuote = (product) => {
    setSelectedProduct(product);
    setModalType('quote');
    setFormSubmitted(false);
  };

  const handleOpenPartner = (type = 'partner') => {
    setModalType(type);
    setFormSubmitted(false);
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    setFormSubmitted(false);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSuccess(true);
      setTimeout(() => setNewsletterSuccess(false), 4000);
      setNewsletterEmail('');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const navigateTo = (tabName, categoryId = null) => {
    setActiveTab(tabName);
    if (categoryId) {
      setSelectedCategory(categoryId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
    if (activeTab !== 'home' && activeTab !== 'shop') {
      setActiveTab('shop');
    }
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById('featured-products-section');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-[#111827]">
      {/* 2-TIER MODERN STICKY HEADER */}
      <header className="site-header">
        {/* UPPER TIER: MAIN NAVIGATION */}
        <div className="main-nav">
          <div className="nav-brand" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <img src={logoImg} alt="Ehthesham Ventures LLC Logo" className="brand-logo-img" />
            <div>
              <div className="brand-title">{companyInfo.name}</div>
              <div className="brand-subtitle">{companyInfo.tagline}</div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <button 
                  className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  onClick={() => navigateTo('home')}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => navigateTo('about')}
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'business' ? 'active' : ''}`}
                  onClick={() => navigateTo('business')}
                >
                  Our Business
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'categories' ? 'active' : ''}`}
                  onClick={() => navigateTo('categories')}
                >
                  Product Categories
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'shop' ? 'active' : ''}`}
                  onClick={() => navigateTo('shop')}
                >
                  Shop
                </button>
              </li>
              <li>
                <button 
                  className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => navigateTo('contact')}
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            <button 
              className="btn-nav-cart"
              onClick={() => setCartOpen(true)}
              aria-label="Open Shopping Cart"
            >
              <ShoppingCart size={18} />
              <span className="nav-cart-text">Cart</span>
              {totalCartItems > 0 && (
                <span className="nav-cart-badge">{totalCartItems}</span>
              )}
            </button>

            <button 
              className="btn-nav-partner"
              onClick={() => handleOpenPartner('partner')}
            >
              <span>Partner</span>
              <ArrowRight size={16} />
            </button>

            <button 
              className="mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        </div>

        {/* LOWER TIER: THE BLUE LINE (PRODUCTS & CATEGORIES SUB-BAR) */}
        <div className="products-blue-bar">
          <div className="blue-bar-content">
            {/* All Products master pill */}
            <div className="blue-bar-categories">
              <button 
                className={`blue-cat-btn all-cat-btn ${selectedCategory === 'all' && (activeTab === 'home' || activeTab === 'shop') ? 'active' : ''}`}
                onClick={() => handleCategoryClick('all')}
              >
                <LayoutGrid size={15} />
                <span>All Products</span>
                <span className="blue-count-pill">{products.length}</span>
              </button>

              <div className="blue-bar-divider"></div>

              {/* Individual Product Categories in the Blue Line */}
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id && (activeTab === 'home' || activeTab === 'shop');
                return (
                  <button
                    key={cat.id}
                    className={`blue-cat-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(cat.id)}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Right side quick contact & direct sourcing desk info */}
            <div className="blue-bar-perks">
              <span className="blue-perk-item">
                <Truck size={14} />
                <span>Fast Wholesale Dispatch</span>
              </span>
              <span className="blue-perk-divider">•</span>
              <a href={`tel:${companyInfo.phoneRaw}`} className="blue-perk-phone">
                <Phone size={13} />
                <span>{companyInfo.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE MENU ACCORDION */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-drawer-section">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setCartOpen(true);
              }}
              className="mobile-cart-btn"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingCart size={18} />
                <span>Shopping Cart</span>
              </span>
              <span className="nav-cart-badge">{totalCartItems}</span>
            </button>
          </div>

          <div className="mobile-drawer-section">
            <div className="mobile-section-label">Navigation</div>
            {[
              { key: 'home', label: 'Home' },
              { key: 'about', label: 'About Us' },
              { key: 'business', label: 'Our Business' },
              { key: 'categories', label: 'Product Categories' },
              { key: 'shop', label: 'Shop' },
              { key: 'contact', label: 'Contact Us' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => navigateTo(item.key)}
                className={`mobile-nav-link ${activeTab === item.key ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mobile-drawer-section">
            <div className="mobile-section-label">Product Categories</div>
            <button
              onClick={() => handleCategoryClick('all')}
              className={`mobile-nav-link ${selectedCategory === 'all' && (activeTab === 'home' || activeTab === 'shop') ? 'active' : ''}`}
            >
              <LayoutGrid size={16} />
              <span>All Categories ({products.length})</span>
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`mobile-nav-link ${selectedCategory === cat.id && (activeTab === 'home' || activeTab === 'shop') ? 'active' : ''}`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="mobile-drawer-footer">
            <button 
              className="btn-hero-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenPartner('partner');
              }}
            >
              Partner with Us
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW: HOME PAGE (EXACT REPLICA OF EHTHESHAM VENTURES LLC HOMEPAGE)
         ========================================================================= */}
      {activeTab === 'home' && (
        <main>
          {/* HERO SECTION WITH VIDEO BACKGROUND & ORIGINAL TEXT */}
          <section className="hero-section" style={{ minHeight: '560px' }}>
            <div className="hero-video-wrapper">
              <video 
                className="hero-video-bg"
                autoPlay 
                muted 
                loop 
                playsInline
                poster="https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=2200&q=85"
              >
                <source src={companyInfo.videoUrl} type="video/mp4" />
              </video>
            </div>
            
            <div className="hero-overlay" style={{
              background: 'linear-gradient(90deg, rgba(14, 26, 63, 0.90) 0%, rgba(30, 58, 138, 0.80) 50%, rgba(14, 26, 63, 0.65) 100%)'
            }}></div>
            
            <div className="hero-container">
              <div className="hero-content">
                <div className="hero-pretitle-badge">
                  {companyInfo.heroSubtitle}
                </div>
                <h1 className="hero-title">
                  {companyInfo.heroTitle}
                </h1>
                <p className="hero-description" style={{ fontSize: '1.15rem', maxWidth: '640px' }}>
                  {companyInfo.heroDescription}
                </p>
                <div className="hero-actions">
                  <button 
                    className="btn-hero-primary"
                    onClick={() => {
                      const el = document.getElementById('featured-products-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    View Categories
                  </button>
                  <button 
                    className="btn-hero-outline"
                    onClick={() => navigateTo('contact')}
                  >
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: PRODUCT CATEGORIES (COVER CARDS) */}
          <section id="categories-section" className="section-wrapper essentials-section" style={{ padding: '70px 24px' }}>
            <div className="section-header-left" style={{ marginBottom: '36px' }}>
              <div style={{ color: '#D97706', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                Shop our categories
              </div>
              <h2 className="section-heading-clean">Product Categories</h2>
            </div>

            <div className="categories-grid-four">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  className="category-card-clean"
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="category-clean-img-wrap">
                    <img 
                      src={cat.image} 
                      alt={cat.name} 
                      className="category-clean-img" 
                      loading="lazy" 
                    />
                    <div className="category-clean-overlay"></div>
                    <div className="category-clean-badge">
                      <Sparkles size={11} />
                      <span>Wholesale</span>
                    </div>
                  </div>
                  <div className="category-clean-info">
                    <h3 className="category-clean-title">{cat.name}</h3>
                    <p className="category-clean-desc">{cat.description}</p>
                    <button className="category-clean-btn">
                      <span>{cat.buttonText || 'Browse'}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION: SHOP OUR CATEGORIES (LIVE PRODUCTS SHOWCASE) */}
          <section id="featured-products-section" className="section-wrapper" style={{ padding: '60px 24px', background: '#ffffff' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px', marginBottom: '32px' }}>
                <div>
                  <div style={{ color: '#D97706', fontSize: '0.82rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Authentic Sourced Catalog
                  </div>
                  <h2 className="section-heading-clean">Shop Our Categories</h2>
                </div>

                {/* Search & Sort Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <input 
                      type="text" 
                      placeholder="Search wholesale products..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      style={{
                        padding: '9px 14px 9px 36px',
                        borderRadius: '30px',
                        border: '1px solid #cbd5e1',
                        fontSize: '0.88rem',
                        outline: 'none',
                        width: '240px'
                      }}
                    />
                  </div>

                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    style={{
                      padding: '9px 14px',
                      borderRadius: '30px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      background: '#fff',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Sort by price: low to high</option>
                    <option value="price-high">Sort by price: high to low</option>
                    <option value="rating">Sort by rating</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="products-grid">
                {filteredProducts.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="product-card"
                    onClick={() => viewProductDetail(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-img-wrap">
                      <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                      <span className="product-badge">{prod.categoryName}</span>
                    </div>

                    <div className="product-body">
                      <div className="product-header-row">
                        <span className="product-sku">SKU: {prod.sku}</span>
                        <span className="stock-tag">● {prod.availability}</span>
                      </div>

                      <h3 className="product-title">
                        <button 
                          onClick={(e) => { e.stopPropagation(); viewProductDetail(prod); }}
                          className="product-title-btn"
                        >
                          {prod.name}
                        </button>
                      </h3>

                      <div className="product-price-box">
                        <span className="product-price-val">{prod.price}</span>
                        <span className="product-price-sub">Wholesale Sourced</span>
                      </div>

                      <p className="product-excerpt">{prod.description}</p>

                      <div className="product-actions-row">
                        <button 
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to cart</span>
                        </button>

                        <button 
                          className="btn-view-details"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewProductDetail(prod);
                          }}
                        >
                          <Eye size={15} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <button 
                  className="btn-hero-primary"
                  onClick={() => navigateTo('shop')}
                  style={{ padding: '12px 32px' }}
                >
                  View All Product Categories
                </button>
              </div>
            </div>
          </section>

          {/* SECTION: OUR SOURCING & AUTHENTICITY PILLARS */}
          <section className="section-wrapper" style={{ padding: '70px 24px', background: '#f8fafc' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="section-header-center" style={{ marginBottom: '48px' }}>
                <div style={{ color: '#D97706', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Legitimate Sourcing
                </div>
                <h2 className="section-heading-clean">{companyInfo.sourcingTitle}</h2>
                <p style={{ color: '#64748b', maxWidth: '720px', margin: '12px auto 0', fontSize: '1.05rem', lineHeight: '1.7' }}>
                  {companyInfo.sourcingDescription}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                {/* Pillar 1: Product Authenticity */}
                <div className="sourcing-pillar-card">
                  <img 
                    src="https://images.unsplash.com/photo-1695561115667-c2e975c7cf22?q=85&w=1200&h=600&fit=crop" 
                    alt="Product Authenticity" 
                    className="sourcing-pillar-img"
                  />
                  <div className="sourcing-pillar-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <ShieldCheck size={22} color="#1e3a8a" />
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0e1a3f' }}>Product Authenticity</h3>
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.65' }}>
                      We focus on authentic products and careful sourcing for our wholesale business, guaranteeing verified supply chains for every category we distribute.
                    </p>
                  </div>
                </div>

                {/* Pillar 2: Resale Channels */}
                <div className="sourcing-pillar-card">
                  <img 
                    src="https://images.unsplash.com/photo-1524221629551-6dd14def5ffd?q=85&w=1200&h=600&fit=crop" 
                    alt="Resale Channels" 
                    className="sourcing-pillar-img"
                  />
                  <div className="sourcing-pillar-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <Layers size={22} color="#1e3a8a" />
                      <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0e1a3f' }}>Resale Channels</h3>
                    </div>
                    <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.65' }}>
                      Our approach supports resale on Amazon and other e-commerce platforms, offering proper invoicing, authorization support, and packaging readiness.
                    </p>
                  </div>
                </div>
              </div>

              {/* OUR COMMITMENT BANNER (FROM LIVE HOMEPAGE) */}
              <div className="commitment-banner">
                <div style={{ position: 'relative', zIndex: 2, maxWidth: '820px' }}>
                  <div style={{ color: '#F5C66A', fontSize: '0.82rem', fontWeight: '800', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '10px' }}>
                    {companyInfo.commitmentTitle}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', lineHeight: '1.4', marginBottom: '16px', color: '#ffffff' }}>
                    "{companyInfo.commitmentQuote}"
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', marginTop: '24px' }}>
                    <button 
                      className="btn-hero-primary"
                      onClick={() => handleOpenPartner('partner')}
                    >
                      Partner with Ehthesham Ventures
                    </button>
                    <a 
                      href={companyInfo.whatsappUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      style={{ color: '#F5C66A', fontWeight: '700', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      <MessageSquare size={18} />
                      <span>Direct WhatsApp Desk: {companyInfo.phone}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION: GET IN TOUCH (CONTACT DETAILS & MAP EMBED) */}
          <section id="contact-section" className="section-wrapper" style={{ padding: '70px 24px', background: '#ffffff' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
              <div className="section-header-center" style={{ marginBottom: '40px' }}>
                <span className="hf-eyebrow-badge">DIRECT COMMUNICATION</span>
                <h2 className="section-heading-clean">Get in Touch</h2>
                <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '600px', margin: '10px auto 0' }}>
                  Contact us about products, sourcing, or supplier inquiries.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '36px' }} className="contact-grid-responsive">
                {/* Left Card: Coordinates */}
                <div style={{ background: '#0e1a3f', color: '#fff', padding: '40px', borderRadius: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '24px', color: '#F5C66A' }}>
                      Contact Information
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontSize: '0.95rem' }}>
                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <MapPin size={22} color="#F5C66A" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <div>
                          <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Address</div>
                          <div style={{ color: '#fff', fontWeight: '600', marginTop: '2px' }}>{companyInfo.address}</div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <Mail size={22} color="#F5C66A" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <div>
                          <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</div>
                          <a href={`mailto:${companyInfo.email}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '600', marginTop: '2px', display: 'inline-block' }}>
                            {companyInfo.email}
                          </a>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <Phone size={22} color="#F5C66A" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <div>
                          <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone / WhatsApp</div>
                          <a href={`tel:${companyInfo.phoneRaw}`} style={{ color: '#fff', textDecoration: 'none', fontWeight: '600', marginTop: '2px', display: 'inline-block' }}>
                            {companyInfo.phone}
                          </a>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                        <Clock size={22} color="#F5C66A" style={{ marginTop: '3px', flexShrink: 0 }} />
                        <div>
                          <div style={{ color: '#94a3b8', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hours</div>
                          <div style={{ color: '#fff', fontWeight: '600', marginTop: '2px' }}>{companyInfo.hours}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <a 
                      href={companyInfo.whatsappUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-cart-whatsapp"
                      style={{ justifyContent: 'center' }}
                    >
                      <MessageSquare size={18} />
                      <span>Chat on WhatsApp ({companyInfo.phone})</span>
                    </a>
                  </div>
                </div>

                {/* Right Column: Interactive Form & Map Embed */}
                <div>
                  <div style={{ background: '#f8fafc', padding: '36px', borderRadius: '24px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '18px', color: '#0e1a3f' }}>Send Us a Message</h3>
                    
                    <form onSubmit={handleFormSubmit} className="modal-form">
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <div className="form-group">
                          <label className="form-label">Name *</label>
                          <input type="text" required placeholder="What's your name?" className="form-input" />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Email *</label>
                          <input type="email" required placeholder="What's your email?" className="form-input" />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Date *</label>
                        <input 
                          type="date" 
                          required 
                          value={contactDate}
                          onChange={(e) => setContactDate(e.target.value)}
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Message *</label>
                        <textarea rows={4} placeholder="Write your message..." required className="form-textarea"></textarea>
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label className="hts-consent-label">
                          <input 
                            type="checkbox" 
                            required 
                            checked={consentChecked}
                            onChange={(e) => setConsentChecked(e.target.checked)}
                            className="hts-consent-checkbox"
                          />
                          <span>
                            I consent to use of provided personal data for the purpose of responding to the request as described in Privacy Policy which I have read. I may withdraw my consent at any time.
                          </span>
                        </label>
                      </div>

                      <button type="submit" className="btn-hero-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        Send Message
                      </button>
                    </form>

                    {formSubmitted && (
                      <div style={{ marginTop: '16px', padding: '14px', background: '#ecfdf5', color: '#065f46', borderRadius: '10px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle2 size={20} color="#059669" />
                        <span>Thank you! Your message has been sent to Ehthesham Ventures LLC. We will follow up shortly.</span>
                      </div>
                    )}
                  </div>

                  {/* Map Iframe */}
                  <div className="map-embed-container">
                    <iframe 
                      src={companyInfo.mapEmbedUrl}
                      height="240" 
                      style={{ width: '100%', border: '0', display: 'block' }} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ehthesham Ventures LLC Sheridan Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          VIEW: ABOUT US PAGE (MATCHING /about-us/)
         ========================================================================= */}
      {activeTab === 'about' && (
        <main className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div className="section-header-center" style={{ marginBottom: '40px' }}>
              <span className="hf-eyebrow-badge">COMPANY PROFILE</span>
              <h1 className="section-title">About Us</h1>
              <p style={{ color: '#64748b', maxWidth: '700px', margin: '10px auto 0', fontSize: '1.05rem' }}>
                Dedicated to sourcing authentic branded merchandise for modern e-commerce channels.
              </p>
            </div>

            {/* About Our Business Block with Images */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '48px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: '48px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }} className="contact-grid-responsive">
                <div>
                  <div style={{ color: '#D97706', fontSize: '0.85rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    U.S. Based Trading Company
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#0e1a3f', marginBottom: '20px', lineHeight: 1.25 }}>
                    {companyInfo.aboutTitle}
                  </h2>
                  <p style={{ color: '#475569', fontSize: '1.08rem', lineHeight: '1.8', marginBottom: '24px' }}>
                    {companyInfo.aboutDescription}
                  </p>
                  <button className="btn-hero-primary" onClick={() => navigateTo('contact')}>
                    Contact Us
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <img 
                    src="https://images.unsplash.com/photo-1666627762609-a9d50d5ec707?q=85&w=600&fit=crop" 
                    alt="Wholesale products sourcing" 
                    style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '16px' }} 
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1678690832311-bb6e361989ca?q=85&w=600&fit=crop" 
                    alt="E-commerce distribution" 
                    style={{ width: '100%', height: '280px', objectFit: 'cover', borderRadius: '16px' }} 
                  />
                </div>
              </div>
            </div>

            {/* Our Sourcing Section */}
            <div style={{ background: '#f8fafc', borderRadius: '24px', padding: '48px', border: '1px solid #e2e8f0' }}>
              <div className="section-header-center" style={{ marginBottom: '36px' }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#0e1a3f', marginBottom: '12px' }}>
                  {companyInfo.sourcingTitle}
                </h2>
                <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.7 }}>
                  {companyInfo.sourcingDescription}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px' }} className="contact-grid-responsive">
                <div className="sourcing-pillar-card">
                  <img 
                    src="https://images.unsplash.com/photo-1695561115667-c2e975c7cf22?q=85&w=1200&h=600&fit=crop" 
                    alt="Product Authenticity" 
                    className="sourcing-pillar-img"
                  />
                  <div className="sourcing-pillar-body">
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#0e1a3f', marginBottom: '10px' }}>
                      Product Authenticity
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.6' }}>
                      We focus on authentic products and careful sourcing for our wholesale business.
                    </p>
                  </div>
                </div>

                <div className="sourcing-pillar-card">
                  <img 
                    src="https://images.unsplash.com/photo-1524221629551-6dd14def5ffd?q=85&w=1200&h=600&fit=crop" 
                    alt="Resale Channels" 
                    className="sourcing-pillar-img"
                  />
                  <div className="sourcing-pillar-body">
                    <h3 style={{ fontSize: '1.3rem', fontWeight: '700', color: '#0e1a3f', marginBottom: '10px' }}>
                      Resale Channels
                    </h3>
                    <p style={{ color: '#475569', fontSize: '0.96rem', lineHeight: '1.6' }}>
                      Our approach supports resale on Amazon and other e-commerce platforms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW: OUR BUSINESS PAGE (MATCHING /our-business/)
         ========================================================================= */}
      {activeTab === 'business' && (
        <main className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
            <div className="section-header-center" style={{ marginBottom: '40px' }}>
              <span className="hf-eyebrow-badge">STRATEGY & OPERATIONS</span>
              <h1 className="section-title">Our Business</h1>
              <p style={{ color: '#64748b', maxWidth: '700px', margin: '10px auto 0', fontSize: '1.05rem' }}>
                Building transparent wholesale pipelines between premier manufacturers and online buyers.
              </p>
            </div>

            {/* Top Overview */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#0e1a3f', marginBottom: '16px' }}>
                {companyInfo.businessTitle}
              </h2>
              <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.8' }}>
                {companyInfo.businessDescription}
              </p>
            </div>

            {/* Two Main Pillars from /our-business/ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '40px' }} className="contact-grid-responsive">
              <div className="sourcing-pillar-card">
                <img 
                  src="https://images.unsplash.com/photo-1675825547463-0788eca2320e?q=85&w=600&fit=crop" 
                  alt="Broad Product Categories" 
                  className="sourcing-pillar-img"
                />
                <div className="sourcing-pillar-body">
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0e1a3f', marginBottom: '10px' }}>
                    Broad Product Categories
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.65' }}>
                    Our categories span beauty, household essentials, kitchen, office, grocery, pet, and sports and outdoor products.
                  </p>
                </div>
              </div>

              <div className="sourcing-pillar-card">
                <img 
                  src="https://images.unsplash.com/photo-1687582394230-79b6651bba09?q=85&w=600&fit=crop" 
                  alt="Supplier Collaboration" 
                  className="sourcing-pillar-img"
                />
                <div className="sourcing-pillar-body">
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#0e1a3f', marginBottom: '10px' }}>
                    Supplier Collaboration
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.98rem', lineHeight: '1.65' }}>
                    We build supplier relationships through clear communication, careful product selection, and practical resale planning.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Callout / Partner Banner */}
            <div style={{ background: '#0e1a3f', color: '#ffffff', borderRadius: '24px', padding: '48px 40px', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', marginBottom: '16px' }}>
                Partner With Ehthesham Ventures LLC
              </h2>
              <p style={{ color: '#cbd5e1', fontSize: '1.1rem', maxWidth: '680px', margin: '0 auto 28px', lineHeight: 1.7 }}>
                We source authentic branded products through legitimate channels for resale across Amazon and other e-commerce marketplaces.
              </p>
              <button 
                className="btn-hero-primary"
                onClick={() => handleOpenPartner('partner')}
                style={{ padding: '14px 36px', fontSize: '1rem' }}
              >
                Partner
              </button>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW: PRODUCT CATEGORIES PAGE (MATCHING /product-categories/)
         ========================================================================= */}
      {activeTab === 'categories' && (
        <main className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="section-header-center" style={{ marginBottom: '40px' }}>
              <span className="hf-eyebrow-badge">PRODUCT SOURCING</span>
              <h1 className="section-title">Product Categories</h1>
              <p style={{ color: '#64748b', maxWidth: '650px', margin: '10px auto 0', fontSize: '1.05rem' }}>
                Featured product categories sourced for reliable turnover and retail excellence.
              </p>
            </div>

            {/* Featured Categories Grid */}
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#0e1a3f', marginBottom: '24px' }}>
                Featured Categories
              </h2>

              <div className="categories-grid-four">
                {categories.map((cat) => (
                  <div 
                    key={cat.id} 
                    className="category-card-clean"
                    onClick={() => handleCategoryClick(cat.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="category-clean-img-wrap">
                      <img src={cat.image} alt={cat.name} className="category-clean-img" loading="lazy" />
                      <div className="category-clean-overlay"></div>
                      <div className="category-clean-badge">
                        <Sparkles size={11} />
                        <span>Wholesale</span>
                      </div>
                    </div>
                    <div className="category-clean-info">
                      <h3 className="category-clean-title">{cat.name}</h3>
                      <p className="category-clean-desc">{cat.description}</p>
                      <button className="category-clean-btn">
                        <span>Browse</span>
                        <ArrowRight size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shop Categories Product Strip */}
            <div style={{ background: '#ffffff', borderRadius: '24px', padding: '40px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#0e1a3f' }}>Shop Categories</h2>
                <button 
                  className="btn-hero-primary"
                  onClick={() => navigateTo('shop')}
                >
                  Browse All Categories
                </button>
              </div>

              <div className="products-grid">
                {products.map((prod) => (
                  <div 
                    key={prod.id} 
                    className="product-card"
                    onClick={() => viewProductDetail(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-img-wrap">
                      <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                      <span className="product-badge">{prod.categoryName}</span>
                    </div>

                    <div className="product-body">
                      <div className="product-header-row">
                        <span className="product-sku">SKU: {prod.sku}</span>
                        <span className="stock-tag">● {prod.availability}</span>
                      </div>

                      <h3 className="product-title">
                        <button 
                          onClick={(e) => { e.stopPropagation(); viewProductDetail(prod); }}
                          className="product-title-btn"
                        >
                          {prod.name}
                        </button>
                      </h3>

                      <div className="product-price-box">
                        <span className="product-price-val">{prod.price}</span>
                        <span className="product-price-sub">Wholesale Tiered</span>
                      </div>

                      <div className="product-actions-row">
                        <button 
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to cart</span>
                        </button>
                        <button 
                          className="btn-view-details"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewProductDetail(prod);
                          }}
                        >
                          <Eye size={15} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW: SHOP PAGE (MATCHING /shop/)
         ========================================================================= */}
      {activeTab === 'shop' && (
        <main className="section-wrapper" style={{ padding: '50px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748b', marginBottom: '20px' }}>
              <span onClick={() => navigateTo('home')} style={{ cursor: 'pointer', color: '#1e3a8a', fontWeight: '600' }}>Home</span>
              <span>/</span>
              <span>Products</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#0e1a3f' }}>Shop</h1>
                <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
                  Showing all {filteredProducts.length} results
                </p>
              </div>

              {/* Sorting & Search */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input 
                    type="text" 
                    placeholder="Search catalog..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      padding: '9px 14px 9px 36px',
                      borderRadius: '30px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.88rem',
                      outline: 'none',
                      width: '220px'
                    }}
                  />
                </div>

                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    padding: '9px 16px',
                    borderRadius: '30px',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.88rem',
                    background: '#fff',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <option value="default">Default sorting</option>
                  <option value="price-low">Sort by price: low to high</option>
                  <option value="price-high">Sort by price: high to low</option>
                  <option value="rating">Sort by average rating</option>
                  <option value="latest">Sort by latest</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((prod) => (
                <div 
                  key={prod.id} 
                  className="product-card"
                  onClick={() => viewProductDetail(prod)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-img-wrap">
                    <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                    <span className="product-badge">{prod.categoryName}</span>
                  </div>

                  <div className="product-body">
                    <div className="product-header-row">
                      <span className="product-sku">SKU: {prod.sku}</span>
                      <span className="stock-tag">● {prod.availability}</span>
                    </div>

                    <h3 className="product-title">
                      <button 
                        onClick={(e) => { e.stopPropagation(); viewProductDetail(prod); }}
                        className="product-title-btn"
                      >
                        {prod.name}
                      </button>
                    </h3>

                    <div className="product-price-box">
                      <span className="product-price-val">{prod.price}</span>
                      <span className="product-price-sub">Wholesale Sourced</span>
                    </div>

                    <p className="product-excerpt">{prod.description}</p>

                    <div className="product-actions-row">
                      <button 
                        className="btn-add-cart"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(prod, 1, true);
                        }}
                      >
                        <ShoppingCart size={15} />
                        <span>Add to cart</span>
                      </button>
                      <button 
                        className="btn-view-details"
                        onClick={(e) => {
                          e.stopPropagation();
                          viewProductDetail(prod);
                        }}
                      >
                        <Eye size={15} />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW: CONTACT US PAGE (MATCHING /contact-us/)
         ========================================================================= */}
      {activeTab === 'contact' && (
        <main className="section-wrapper" style={{ padding: '60px 24px' }}>
          <div className="contact-page-container">
            <div className="section-header-center" style={{ marginBottom: '40px' }}>
              <span className="hf-eyebrow-badge">CONNECT WITH US</span>
              <h1 className="section-title">Contact Us</h1>
              <p style={{ color: '#64748b', maxWidth: '620px', margin: '10px auto 0', fontSize: '1.05rem', lineHeight: 1.6 }}>
                Contact us about wholesale orders, authentic product sourcing, or supplier partnership inquiries.
              </p>
            </div>

            <div className="contact-page-card-grid">
              {/* Form Side */}
              <div className="contact-form-card">
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                      <Send size={18} />
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', color: '#0e1a3f', margin: 0 }}>
                      Get in Touch
                    </h2>
                  </div>
                  <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '24px' }}>
                    Fill out the form below and our sourcing desk will reply with full catalog and tier details.
                  </p>

                  <form onSubmit={handleFormSubmit} className="modal-form">
                    <div className="contact-form-row-2col">
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input type="text" required placeholder="What's your name?" className="form-input" />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Email Address *</label>
                        <input type="email" required placeholder="What's your email?" className="form-input" />
                      </div>
                    </div>

                    <div className="contact-form-row-2col">
                      <div className="form-group">
                        <label className="form-label">Inquiry Date *</label>
                        <input 
                          type="date" 
                          required 
                          value={contactDate}
                          onChange={(e) => setContactDate(e.target.value)}
                          className="form-input" 
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">Phone / WhatsApp (Optional)</label>
                        <input type="tel" placeholder="+1 (555) 000-0000" className="form-input" />
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Message / Sourcing Requirements *</label>
                      <textarea rows={4} placeholder="Tell us about the products, quantities, or resale questions you have..." required className="form-textarea"></textarea>
                    </div>

                    <div style={{ marginBottom: '8px' }}>
                      <label className="hts-consent-label">
                        <input 
                          type="checkbox" 
                          required 
                          checked={consentChecked}
                          onChange={(e) => setConsentChecked(e.target.checked)}
                          className="hts-consent-checkbox"
                        />
                        <span>
                          I consent to use of provided personal data for the purpose of responding to the request as described in Privacy Policy which I have read. I may withdraw my consent at any time.
                        </span>
                      </label>
                    </div>

                    <button type="submit" className="btn-hero-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '1rem' }}>
                      <Send size={16} />
                      <span>Send Message</span>
                    </button>
                  </form>

                  {formSubmitted && (
                    <div style={{ marginTop: '18px', padding: '14px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid #a7f3d0' }}>
                      <CheckCircle2 size={20} color="#059669" />
                      <span>Thank you! Your message has been sent to Ehthesham Ventures LLC. We will follow up shortly.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Coordinates Side */}
              <div className="contact-info-column">
                <div className="contact-navy-card">
                  <h3 className="contact-navy-card-title">
                    <Building2 size={22} color="#F5C66A" />
                    <span>Company Address & Hours</span>
                  </h3>

                  <div className="contact-item-row">
                    <div className="contact-item-icon-pill">
                      <MapPin size={20} />
                    </div>
                    <div className="contact-item-content">
                      <div className="contact-item-label">Corporate Address</div>
                      <p className="contact-item-value">{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-item-icon-pill">
                      <Clock size={20} />
                    </div>
                    <div className="contact-item-content">
                      <div className="contact-item-label">Operating Hours</div>
                      <p className="contact-item-value">{companyInfo.hours}</p>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-item-icon-pill">
                      <Mail size={20} />
                    </div>
                    <div className="contact-item-content">
                      <div className="contact-item-label">Corporate Email</div>
                      <a href={`mailto:${companyInfo.email}`} className="contact-item-link">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="contact-item-row">
                    <div className="contact-item-icon-pill">
                      <Phone size={20} />
                    </div>
                    <div className="contact-item-content">
                      <div className="contact-item-label">Phone & WhatsApp</div>
                      <a href={`tel:${companyInfo.phoneRaw}`} className="contact-item-link">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
                    <a 
                      href={companyInfo.whatsappUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="btn-cart-whatsapp"
                      style={{ justifyContent: 'center', width: '100%' }}
                    >
                      <MessageSquare size={17} />
                      <span>Chat Directly on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="contact-map-wrapper">
                  <iframe 
                    src={companyInfo.mapEmbedUrl}
                    className="contact-map-iframe"
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ehthesham Ventures LLC Location Map"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="contact-trust-strip">
              <div className="contact-trust-item">
                <div className="contact-trust-icon">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <div className="contact-trust-title">Verified U.S. Entity</div>
                  <div className="contact-trust-sub">Wyoming registered wholesale trading LLC with verified procurement.</div>
                </div>
              </div>

              <div className="contact-trust-item">
                <div className="contact-trust-icon">
                  <Truck size={24} />
                </div>
                <div>
                  <div className="contact-trust-title">Fast Wholesale Dispatch</div>
                  <div className="contact-trust-sub">Compliant shipment preparation for Amazon FBA & commercial distribution.</div>
                </div>
              </div>

              <div className="contact-trust-item">
                <div className="contact-trust-icon">
                  <Award size={24} />
                </div>
                <div>
                  <div className="contact-trust-title">Authentic Brand Invoices</div>
                  <div className="contact-trust-sub">Genuine products backed by full resale documentation & authorization.</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW: PRODUCT DETAIL PAGE
         ========================================================================= */}
      {activeTab === 'product-detail' && activeProduct && (
        <div className="product-detail-page">
          <div className="detail-container">
            {/* Top Breadcrumbs & Back Button */}
            <div className="detail-top-nav">
              <button 
                className="btn-back-catalog" 
                onClick={() => navigateTo('shop')}
              >
                <ArrowLeft size={16} />
                <span>Back to Products</span>
              </button>
              <div className="detail-breadcrumbs">
                <span onClick={() => navigateTo('home')} className="crumb-link">Home</span>
                <span className="crumb-sep">/</span>
                <span 
                  onClick={() => { setSelectedCategory(activeProduct.category); navigateTo('shop'); }} 
                  className="crumb-link"
                >
                  {activeProduct.categoryName}
                </span>
                <span className="crumb-sep">/</span>
                <span className="crumb-current">{activeProduct.name}</span>
              </div>
            </div>

            {/* Main Product Showcase Grid */}
            <div className="detail-showcase-grid">
              {/* Left Column: Visual Showcase */}
              <div className="detail-gallery-col">
                <div className="detail-img-card">
                  <img 
                    src={activeProduct.image} 
                    alt={activeProduct.name} 
                    className="detail-hero-img" 
                  />
                  <div className="detail-badge-float">{activeProduct.categoryName}</div>
                  <div className="detail-verified-badge">
                    <ShieldCheck size={16} />
                    <span>100% Authentic Branded Sourcing</span>
                  </div>
                </div>

                <div className="detail-assurance-strip">
                  <div className="assurance-item">
                    <Truck size={18} className="assurance-icon" />
                    <div>
                      <strong>Wholesale Sourcing</strong>
                      <span>Dispatched from Sheridan, WY and Global Trade Centers</span>
                    </div>
                  </div>
                  <div className="assurance-item">
                    <Award size={18} className="assurance-icon" />
                    <div>
                      <strong>Channel Compliant</strong>
                      <span>Ready for Amazon FBA & E-commerce fulfillment</span>
                    </div>
                  </div>
                  <div className="assurance-item">
                    <Building2 size={18} className="assurance-icon" />
                    <div>
                      <strong>Wyoming LLC Registered</strong>
                      <span>Official Corporate Entity #68440</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Commercial Product Information */}
              <div className="detail-info-col">
                <div className="detail-meta-row">
                  <span className="detail-sku-badge">SKU: {activeProduct.sku}</span>
                  <span className="detail-stock-badge">
                    <span className="stock-pulsing-dot"></span>
                    {activeProduct.availability} ({activeProduct.stockUnits?.toLocaleString() || '1,000+'} units available)
                  </span>
                </div>

                <h1 className="detail-product-title">{activeProduct.name}</h1>

                <div className="detail-reviews-row">
                  <div className="star-rating">★★★★★</div>
                  <span className="rating-score">{activeProduct.rating}</span>
                  <span className="review-count">({activeProduct.reviewCount || 24} wholesale buyer reviews)</span>
                </div>

                <div className="detail-price-panel">
                  <div className="detail-price-row">
                    <div className="detail-unit-price">
                      <span className="price-currency">{activeProduct.price}</span>
                      <span className="price-per">/ unit</span>
                    </div>
                    <div className="detail-price-note">
                      <span className="tax-tag">Wholesale Net</span>
                      <span>{activeProduct.priceNote}</span>
                    </div>
                  </div>
                  <div className="detail-moq-row">
                    <span>Minimum Wholesale Order (MOQ):</span>
                    <strong>{activeProduct.minOrder}</strong>
                  </div>
                </div>

                {/* Wholesale Volume Tier Table */}
                {activeProduct.tiers && activeProduct.tiers.length > 0 && (
                  <div className="wholesale-tiers-box">
                    <div className="tiers-title">Wholesale Volume Pricing Tiers:</div>
                    <div className="tiers-grid">
                      {activeProduct.tiers.map((tier, idx) => (
                        <div key={idx} className="tier-card">
                          <div className="tier-qty">{tier.range}</div>
                          <div className="tier-price">{tier.price} <small>/ unit</small></div>
                          <div className="tier-discount">{tier.discount}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <p className="detail-lead-summary">{activeProduct.description}</p>

                {/* Key Features Bullet Points */}
                {activeProduct.features && (
                  <div className="detail-features-box">
                    <h3 className="features-title">Product Highlights:</h3>
                    <ul className="features-list">
                      {activeProduct.features.map((feat, idx) => (
                        <li key={idx}>
                          <Check size={16} className="feature-check" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Purchase & Cart Actions */}
                <div className="detail-purchase-panel">
                  <div className="qty-row">
                    <label className="qty-label">Order Quantity:</label>
                    <div className="qty-stepper">
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(q => Math.max(1, q - 1))}
                      >
                        <Minus size={16} />
                      </button>
                      <input 
                        type="number" 
                        min="1" 
                        value={detailQuantity} 
                        onChange={(e) => setDetailQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                        className="stepper-input"
                      />
                      <button 
                        type="button" 
                        className="stepper-btn"
                        onClick={() => setDetailQuantity(q => q + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="subtotal-preview">
                      Subtotal: <strong>${(activeProduct.priceNumeric * detailQuantity).toLocaleString()}</strong>
                    </div>
                  </div>

                  <div className="detail-actions-grid">
                    <button 
                      className="btn-detail-add-cart"
                      onClick={() => addToCart(activeProduct, detailQuantity, true)}
                    >
                      <ShoppingCart size={18} />
                      <span>Add to Cart ({detailQuantity} Units)</span>
                    </button>

                    <a 
                      href={`https://wa.me/+9669362206795?text=${encodeURIComponent(`Hello Ehthesham Ventures LLC, I want to inquire/order ${detailQuantity}x ${activeProduct.name} (SKU: ${activeProduct.sku}, Total: $${(activeProduct.priceNumeric * detailQuantity).toLocaleString()}).`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-detail-whatsapp"
                    >
                      <MessageSquare size={18} />
                      <span>WhatsApp Direct Order</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabbed Product Details */}
            <div className="detail-tabs-section">
              <div className="detail-tabs-header">
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'description' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('description')}
                >
                  Description
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'specs' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('specs')}
                >
                  Specifications
                </button>
                <button 
                  className={`detail-tab-btn ${activeDetailTab === 'shipping' ? 'active' : ''}`}
                  onClick={() => setActiveDetailTab('shipping')}
                >
                  Logistics & Terms
                </button>
              </div>

              <div className="detail-tab-content">
                {activeDetailTab === 'description' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Product Description</h3>
                    <p className="tab-lead-text">{activeProduct.longDescription || activeProduct.description}</p>
                    <div className="tab-features-grid">
                      <div className="tab-feature-card">
                        <h4>Authentic Sourcing Guarantee</h4>
                        <p>Procured directly from legitimate brand owners and authorized distributors to provide full resale compliance on Amazon and leading e-commerce platforms.</p>
                      </div>
                      <div className="tab-feature-card">
                        <h4>Packaging & Preparation</h4>
                        <p>Delivered in shelf-ready retail cartons with standard barcodes and protective packing designed for safe transit.</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDetailTab === 'specs' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Technical Specifications & Sourcing Data</h3>
                    {activeProduct.specs && activeProduct.specs.length > 0 ? (
                      <table className="specs-table">
                        <tbody>
                          {activeProduct.specs.map((item, idx) => (
                            <tr key={idx}>
                              <td className="spec-label">{item.label}</td>
                              <td className="spec-value">{item.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p>Standard manufacturer specifications apply. Contact us for further documentation.</p>
                    )}
                  </div>
                )}

                {activeDetailTab === 'shipping' && (
                  <div className="tab-pane">
                    <h3 className="tab-title">Wholesale Logistics & Dispatch Terms</h3>
                    <div className="shipping-info-grid">
                      <div className="ship-card">
                        <h4>Fulfillment & Sourcing</h4>
                        <p>Orders are verified and prepared through authorized channels. Tracking information is provided upon dispatch.</p>
                      </div>
                      <div className="ship-card">
                        <h4>Headquarters & Facilities</h4>
                        <p>Registered at {companyInfo.address}. Coordinating domestic US logistics and international merchant sourcing.</p>
                      </div>
                      <div className="ship-card">
                        <h4>Inquiries & Custom Quantities</h4>
                        <p>Reach out directly to confirm current stock levels, case quantities, and wholesale pricing agreements.</p>
                      </div>
                      <div className="ship-card">
                        <h4>Support Contacts</h4>
                        <p>Email: {companyInfo.email} | Phone / WhatsApp: {companyInfo.phone}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products Strip */}
            <div className="detail-related-section">
              <div className="related-header">
                <span className="section-tag">CATALOG ASSORTMENT</span>
                <h2 className="related-title">Other Products from Ehthesham Ventures</h2>
              </div>

              <div className="products-grid">
                {products.filter(p => p.id !== activeProduct.id).map(prod => (
                  <div 
                    key={prod.id} 
                    className="product-card" 
                    onClick={() => viewProductDetail(prod)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="product-img-wrap">
                      <img src={prod.image} alt={prod.name} className="product-img" loading="lazy" />
                      <span className="product-badge">{prod.categoryName}</span>
                    </div>
                    <div className="product-body">
                      <div className="product-header-row">
                        <span className="product-sku">SKU: {prod.sku}</span>
                        <span className="stock-tag">● {prod.availability}</span>
                      </div>
                      <h3 className="product-title">
                        <button 
                          onClick={(e) => { e.stopPropagation(); viewProductDetail(prod); }}
                          className="product-title-btn"
                        >
                          {prod.name}
                        </button>
                      </h3>
                      <div className="product-price-box">
                        <span className="product-price-val">{prod.price}</span>
                        <span className="product-price-sub">Wholesale Tiered</span>
                      </div>
                      <p className="product-excerpt">{prod.description}</p>
                      <div className="product-actions-row">
                        <button 
                          className="btn-add-cart"
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(prod, 1, true);
                          }}
                        >
                          <ShoppingCart size={15} />
                          <span>Add to cart</span>
                        </button>
                        <button 
                          className="btn-view-details"
                          onClick={(e) => {
                            e.stopPropagation();
                            viewProductDetail(prod);
                          }}
                        >
                          <Eye size={15} />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          SITE FOOTER (EXACT REPLICA OF LIVE FOOTER)
         ========================================================================= */}
      <footer className="site-footer" style={{ background: '#0e1a3f', color: '#ffffff' }}>
        <div className="footer-container">
          <div className="footer-brand">
            <img src={logoImg} alt="Ehthesham Ventures LLC Logo" className="footer-logo-img" />
            <h3 style={{ color: '#ffffff', fontSize: '1.4rem', marginBottom: '10px' }}>{companyInfo.name}</h3>
            <p style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '0.92rem' }}>
              {companyInfo.heroDescription}
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#94a3b8' }}>
              <div><strong>Address:</strong> {companyInfo.address}</div>
              <div><strong>Hours:</strong> {companyInfo.hours}</div>
              <div><strong>Hotline:</strong> {companyInfo.phone} • {companyInfo.email}</div>
            </div>
          </div>

          <div className="footer-col">
            <h4 style={{ color: '#F5C66A' }}>Menu</h4>
            <ul>
              <li><a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a></li>
              <li><a href="#business" onClick={(e) => { e.preventDefault(); navigateTo('business'); }}>Our Business</a></li>
              <li><a href="#categories" onClick={(e) => { e.preventDefault(); navigateTo('categories'); }}>Product Categories</a></li>
              <li><a href="#shop" onClick={(e) => { e.preventDefault(); navigateTo('shop'); }}>Shop</a></li>
              <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact Us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 style={{ color: '#F5C66A' }}>Contacts</h4>
            <ul style={{ marginBottom: '20px' }}>
              <li>
                <a href={`mailto:${companyInfo.email}`}>
                  {companyInfo.email}
                </a>
              </li>
              <li>
                <a href={`tel:${companyInfo.phoneRaw}`}>
                  {companyInfo.phone}
                </a>
              </li>
            </ul>

            <h4 style={{ color: '#F5C66A', marginTop: '16px' }}>Socials</h4>
            <ul className="footer-social-links">
              <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
              <li><a href="https://tiktok.com" target="_blank" rel="noreferrer">TikTok</a></li>
              <li><a href={companyInfo.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 style={{ color: '#F5C66A' }}>Subscribe to our newsletter</h4>
            <p style={{ fontSize: '0.85rem', marginBottom: '14px', color: '#cbd5e1' }}>
              Stay updated with product arrivals and sourcing opportunities.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>EMAIL *</label>
              <input 
                type="email" 
                required 
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  padding: '11px 14px',
                  borderRadius: '6px',
                  border: '1px solid #334155',
                  background: '#152433',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                style={{
                  background: 'linear-gradient(135deg, #F5C66A 0%, #D97706 100%)',
                  color: '#0e1a3f',
                  padding: '12px',
                  borderRadius: '6px',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  marginTop: '6px',
                  letterSpacing: '0.02em',
                  boxShadow: '0 4px 14px rgba(217, 119, 6, 0.25)'
                }}
              >
                Subscribe
              </button>
            </form>

            {newsletterSuccess && (
              <div style={{ marginTop: '10px', color: '#4ade80', fontSize: '0.82rem' }}>
                ✓ Thank you for subscribing to Ehthesham Ventures LLC!
              </div>
            )}
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 <strong>{companyInfo.legalName}</strong>. All rights reserved.
          </div>
          <div style={{ color: '#94a3b8' }}>
            {companyInfo.address}
          </div>
        </div>
      </footer>

      {/* =========================================================================
          CART DRAWER SLIDE-OVER
         ========================================================================= */}
      {cartOpen && (
        <div className="cart-backdrop" onClick={() => setCartOpen(false)}>
          <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-drawer-header">
              <div className="cart-header-title">
                <ShoppingBag size={20} color="#1e3a8a" />
                <h3>Your Wholesale Cart</h3>
                <span className="cart-count-pill">{totalCartItems} items</span>
              </div>
              <button className="cart-close-btn" onClick={() => setCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cart-drawer-body">
              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <div className="empty-cart-icon">
                    <ShoppingCart size={48} strokeWidth={1.5} color="#94a3b8" />
                  </div>
                  <h4>Your Cart is Empty</h4>
                  <p>Browse our categories and add products to your cart for direct ordering.</p>
                  <button 
                    className="btn-hero-primary" 
                    style={{ marginTop: '16px' }}
                    onClick={() => {
                      setCartOpen(false);
                      navigateTo('shop');
                    }}
                  >
                    Explore Shop
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cart.map((item) => (
                    <div key={item.product.id} className="cart-item-card">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name} 
                        className="cart-item-thumb"
                        onClick={() => {
                          viewProductDetail(item.product);
                          setCartOpen(false);
                        }}
                      />
                      <div className="cart-item-details">
                        <div className="cart-item-meta">
                          <span className="cart-item-sku">SKU: {item.product.sku}</span>
                          <button 
                            className="btn-remove-item"
                            onClick={() => removeFromCart(item.product.id)}
                            title="Remove item"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                        <h4 
                          className="cart-item-title"
                          onClick={() => {
                            viewProductDetail(item.product);
                            setCartOpen(false);
                          }}
                        >
                          {item.product.name}
                        </h4>
                        <div className="cart-item-price-row">
                          <span className="cart-unit-price">{item.product.price} / unit</span>
                          <span className="cart-line-total">${(item.product.priceNumeric * item.quantity).toLocaleString()}</span>
                        </div>
                        <div className="cart-stepper-row">
                          <div className="cart-qty-stepper">
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, -1)}
                              className="cart-step-btn"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="cart-step-val">{item.quantity}</span>
                            <button 
                              onClick={() => updateCartQuantity(item.product.id, 1)}
                              className="cart-step-btn"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            className="cart-view-link"
                            onClick={() => {
                              viewProductDetail(item.product);
                              setCartOpen(false);
                            }}
                          >
                            View details →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="cart-drawer-footer">
                <div className="cart-summary-box">
                  <div className="summary-row">
                    <span>Total Quantity:</span>
                    <strong>{totalCartItems} units</strong>
                  </div>
                  <div className="summary-row subtotal">
                    <span>Estimated Subtotal:</span>
                    <strong className="summary-amount">${cartSubtotal.toLocaleString()}</strong>
                  </div>
                  <p className="summary-note">Wholesale quantities and terms confirmed upon inquiry dispatch.</p>
                </div>

                <div className="cart-footer-actions">
                  <a 
                    href={`https://wa.me/+9669362206795?text=${encodeURIComponent(
                      `Hello Ehthesham Ventures LLC, I want to place a wholesale order:\n\n` +
                      cart.map(i => `• ${i.product.name} (SKU: ${i.product.sku}) - Qty: ${i.quantity} x ${i.product.price} = $${(i.product.priceNumeric * i.quantity).toLocaleString()}`).join('\n') +
                      `\n\nTotal Estimated: $${cartSubtotal.toLocaleString()}\nTotal Units: ${totalCartItems}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-cart-whatsapp"
                  >
                    <MessageSquare size={18} />
                    <span>Instant Checkout via WhatsApp</span>
                  </a>

                  <button 
                    className="btn-cart-checkout"
                    onClick={() => {
                      setCartOpen(false);
                      handleOpenPartner('checkout');
                    }}
                  >
                    <span>Proceed to Wholesale Checkout</span>
                    <ArrowRight size={18} />
                  </button>
                </div>

                <div className="cart-clear-row">
                  <button onClick={clearCart} className="btn-clear-cart">
                    Clear Entire Cart
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="cart-toast">
          <CheckCircle2 size={18} color="#10b981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL: QUOTE REQUEST, PARTNER INQUIRY, OR CHECKOUT */}
      {modalType && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={18} />
            </button>

            {modalType === 'quote' && selectedProduct && (
              <>
                <h3 className="modal-title">Request Wholesale Quote</h3>
                <p className="modal-subtitle">
                  Inquiring for: <strong>{selectedProduct.name}</strong> (SKU: {selectedProduct.sku})
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Email *</label>
                    <input type="email" required placeholder="buyer@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number / WhatsApp *</label>
                    <input type="tel" required placeholder="(+966) / (+1) Phone" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Requested Quantity (Minimum: {selectedProduct.minOrder})</label>
                    <input type="text" placeholder={`e.g. 25 Units / 1 Case`} className="form-input" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Destination Location / Zip Code</label>
                    <input type="text" placeholder="City, State / Country" className="form-input" required />
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Submit Quote Request
                  </button>
                </form>
              </>
            )}

            {modalType === 'partner' && (
              <>
                <h3 className="modal-title">Partner with Ehthesham Ventures LLC</h3>
                <p className="modal-subtitle">
                  Connect with our sourcing desk for wholesale distribution and retail supply.
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business / Company Name *</label>
                    <input type="text" required placeholder="Your company or business" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input type="email" required placeholder="contact@company.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone / WhatsApp *</label>
                    <input type="tel" required placeholder="(+966) 9362206795 or local line" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Categories of Interest</label>
                    <select className="form-select">
                      <option>All Product Categories</option>
                      <option>Beauty & Personal Care</option>
                      <option>Health & Household</option>
                      <option>Home & Kitchen</option>
                      <option>Office Products</option>
                      <option>Pet Care Essentials</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Notes / Wholesale Requirements</label>
                    <textarea rows={3} placeholder="Tell us about your sourcing needs and resale platforms..." className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Connect With Ehthesham Ventures
                  </button>
                </form>
              </>
            )}

            {modalType === 'checkout' && (
              <>
                <h3 className="modal-title">Wholesale Checkout / Purchase Order</h3>
                <p className="modal-subtitle">
                  Submitting order for: <strong>{totalCartItems} units • Total: ${cartSubtotal.toLocaleString()}</strong>
                </p>
                <form onSubmit={handleFormSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label">Buyer / Contact Name *</label>
                    <input type="text" required placeholder="Your name" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Company / Business Name *</label>
                    <input type="text" required placeholder="Company / Organization" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Business Email *</label>
                    <input type="email" required placeholder="buyer@example.com" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Phone Number *</label>
                    <input type="tel" required placeholder="(+966) / (+1) Phone" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Delivery Address *</label>
                    <input type="text" required placeholder="Warehouse address, City, Country" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Order Notes / Custom Instructions</label>
                    <textarea rows={2} placeholder="Optional delivery instructions, packaging requirements..." className="form-textarea"></textarea>
                  </div>
                  <button type="submit" className="btn-submit-modal">
                    Confirm & Submit Order (${cartSubtotal.toLocaleString()})
                  </button>
                </form>
              </>
            )}

            {formSubmitted && (
              <div style={{ marginTop: '20px', padding: '16px', background: '#ecfdf5', color: '#065f46', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={24} color="#059669" />
                <div>
                  <strong>Inquiry / Order Received!</strong>
                  <p style={{ fontSize: '0.85rem' }}>Ehthesham Ventures LLC trade desk will confirm your request and reach out promptly via email and WhatsApp.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
