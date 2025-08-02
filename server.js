const {createServer} = require('http');
const {parse} = require('url');
const {readFileSync} = require('fs');
const {renderToString} = require('react-dom/server');
const React = require('react');

const htmlTemplate =  readFileSync(`${__dirname}/index.html`, 'utf8');

const server = createServer((req, res) =>
{

    const pathName = parse(req.url, true).pathname;

    if (pathName === '/') {
        const renderedHtml = renderToString(<Home />);
        const fullHtml = htmlTemplate.replace(
            '%%%CONTENT%%%',
            renderedHtml
        );

        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end(fullHtml);

    }else if (pathName === '/test') {
        res.end("test");
    } else  {
        res.statusCode = 404;
        res.end("Not Found");
    }
});



server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});


const pizzas = [
    {
        name: "Focaccia",
        price: 6,
    },
    {
        name: "Pizza Margherita",
        price: 10,
    },
    {
        name: "Pizza Spinaci",
        price: 12,
    },
    {
        name: "Pizza Funghi",
        price: 12,
    },
    {
        name: "Pizza Prosciutto",
        price: 15,
    },
];

function Home() {
    return (
        <div>
            <h1>🍕 Fast React Pizza Co.</h1>
            <p>This page has been rendered with React on the server 🤯</p>

            <h2>Menu</h2>
            <ul>
                {pizzas.map((pizza) => (
                    <MenuItem pizza={pizza} key={pizza.name} />
                ))}
            </ul>
        </div>
    );
}

function Counter() {
    const [count, setCount] = React.useState(0);
    return (
        <div>
            <button onClick={() => setCount((c) => c + 1)}>+1</button>
            <span>{count}</span>
        </div>
    );
}

function MenuItem({ pizza }) {
    return (
        <li>
            <h4>
                {pizza.name} (${pizza.price})
            </h4>
            <Counter />
        </li>
    );
}