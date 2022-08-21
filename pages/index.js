import Head from "next/head";
import Image from "next/image";
import CatsCard from "../components/CatsCard/CatsCard";

function Home({ data }) {
  return (
    <div className="cats">
      <div className="container">
        {data.length ? (
          <ul className="cats__list">
            {data.map((item) => (
              <CatsCard key={item._id} item={item} />
            ))}
          </ul>
        ) : (
          <p className="list-error">Ошибка загрузки списка животных</p>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3001/cats");
  console.log(res);
  const json = await res.json();
  return {
    props: {
      data: json.length ? json : null,
    }, // will be passed to the page component as props
  };
}

export default Home;
