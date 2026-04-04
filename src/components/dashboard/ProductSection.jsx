import { getProductRecommendations, getDietTotals } from "../../utils/dietEngine";

export default function ProductSection({ state, savedDiet }) {
  const dietTotals = savedDiet?.meals?.length ? getDietTotals(savedDiet.meals) : null;
  const products   = getProductRecommendations(state, dietTotals);

  if (!products.length) {
    return (
      <div className="empty-state">
        No extra product recommendation is needed right now based on the conditions you selected.
      </div>
    );
  }
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.key} className="product-card">
          <img src={product.image} alt={product.name} />
          <div className="product-info">
            <h4>{product.name}</h4>
            <p>{product.benefit}</p>
            <a className="buy-link" href={product.link} target="_blank" rel="noopener noreferrer">Buy Now</a>
          </div>
        </div>
      ))}
    </div>
  );
}
