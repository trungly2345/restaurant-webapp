import './index.css';



function ViewMenu({ title, items }) {
    return (
        <div className="view-menu">
            <h2>{title}</h2>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default ViewMenu;
