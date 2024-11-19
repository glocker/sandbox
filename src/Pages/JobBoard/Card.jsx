import './Card.css';

export default function Card({job}) {

    const {title, by, time} = job;

    const date = new Date(time);

    return (
        <div className="card">
            <header>
                <h3>{title}</h3>
            </header>
            <footer>
                <div>Author: {by}</div>
                <div>{date.toLocaleString()}</div>
            </footer>
        </div>
    )
}