export default function CategoryCard(props) {
  const clickable = Boolean(props.onClick);

  return (
    <div
      className="category-card"
      onClick={() => props.onClick?.(props.category)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      style={{ cursor: clickable ? "pointer" : "default" }}
    >
      <div className={`category-card ${props.isSelected ? "active" : ""}`}>
      
        <h4>{props.category}</h4>
        <p>{props.productCount} products</p>
      </div>
    </div>
  );
}
