import React from "react";
import { PRODUCT_CATALOG } from "../../utils/dietEngine";

/**
 * ProductCarousel - A shared horizontal scrolling carousel for Olilife products.
 * @param {string} variant - 'hero' (large) or 'slim' (compact)
 */
export default function ProductCarousel({ variant = "hero" }) {
  const products = [...PRODUCT_CATALOG, ...PRODUCT_CATALOG]; // Doubled for seamless loop

  return (
    <div className={`product-carousel-container ${variant}`}>
      <div className="product-track">
        {products.map((p, i) => (
          <a 
            key={`${p.key}-${i}`} 
            href={p.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`product-scroll-item ${variant}`}
          >
            <img src={p.image} alt={p.name} className="product-scroll-image" />
            <h4 className="product-scroll-name">{p.name}</h4>
            {variant === "hero" && <p className="product-scroll-benefit">{p.benefit}</p>}
          </a>
        ))}
      </div>
    </div>
  );
}
